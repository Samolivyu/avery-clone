import Timesheet from '../models/timesheet.model.js';
import User from '../models/user.js'; // Assuming you have a User model for populating

// Helper function to get current user ID from request (from authenticate middleware)
const getUserId = (req) => {
  // Assuming 'authenticate' middleware attaches user ID to req.user._id or req.userId
  return req.user ? req.user._id : req.userId;
};

export const clockIn = async (req, res) => {
  try {
    const { notes } = req.body;
    const userId = getUserId(req); // Use helper function to get userId

    // Check for existing active session
    const activeLog = await Timesheet.findOne({
      userId,
      clockOut: { $exists: false }
    });

    if (activeLog) {
      return res.status(400).json({ error: 'Already clocked in' });
    }

    const newLog = new Timesheet({
      userId,
      notes,
      ip: req.ip // IP address will be captured by Express
    });

    await newLog.save();
    res.status(201).json(newLog);

  } catch (error) {
    console.error('Clock-in error:', error);
    res.status(500).json({ error: 'Clock-in failed' });
  }
};

export const clockOut = async (req, res) => {
  try {
    const { notes } = req.body;
    const userId = getUserId(req);

    const activeLog = await Timesheet.findOne({
      userId,
      clockOut: { $exists: false }
    });

    if (!activeLog) {
      return res.status(400).json({ error: 'No active session' });
    }

    activeLog.clockOut = new Date();
    if (notes) activeLog.notes = notes;
    await activeLog.save();

    res.json(activeLog);

  } catch (error) {
    console.error('Clock-out error:', error);
    res.status(500).json({ error: 'Clock-out failed' });
  }
};

export const getActiveLog = async (req, res) => {
  try {
    const userId = getUserId(req);
    const activeLog = await Timesheet.findOne({
      userId,
      clockOut: { $exists: false }
    }).populate('userId', 'firstName lastName email'); // Populate user details

    res.json({ activeLog: activeLog || null });

  } catch (error) {
    console.error('Active log error:', error);
    res.status(500).json({ error: 'Failed to get active log' });
  }
};

export const getTodaysLogs = async (req, res) => {
  try {
    const userId = getUserId(req);
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const logs = await Timesheet.find({
      userId,
      clockIn: { $gte: startOfDay, $lte: endOfDay }
    })
    .sort({ clockIn: -1 })
    .populate('userId', 'firstName lastName');

    res.json({ logs });

  } catch (error) {
    console.error('Today logs error:', error);
    res.status(500).json({ error: 'Failed to get logs' });
  }
};

// New: Get all logs for a specific user (used by TimeLogsTable)
export const getUserLogs = async (req, res) => {
  try {
    const requestedUserId = req.params.userId; // Get userId from URL parameter
    const authUserId = getUserId(req); // Get authenticated user's ID

    // Security check: Ensure authenticated user can only view their own logs or is admin
    if (requestedUserId !== String(authUserId) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. You can only view your own logs.' });
    }

    const logs = await Timesheet.find({ userId: requestedUserId })
      .sort({ clockIn: -1 })
      .populate('userId', 'firstName lastName email');

    res.json({ logs });
  } catch (error) {
    console.error('Error fetching user logs:', error);
    res.status(500).json({ error: 'Failed to fetch user logs' });
  }
};

export const getActiveBreak = async (req, res) => {
  try {
    const userId = getUserId(req);
    const activeLog = await Timesheet.findOne({ 
      userId, 
      clockOut: { $exists: false },
      breakStart: { $ne: null },
      breakEnd: null
    });

    const activeBreakData = activeLog ? {
      timesheetId: activeLog._id,
      startTime: activeLog.breakStart
    } : null;

    res.json({ activeBreak: activeBreakData });

  } catch (error) {
    console.error('Active break error:', error);
    res.status(500).json({ error: 'Failed to get active break' });
  }
};