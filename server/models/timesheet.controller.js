// server/controllers/timesheet.controller.js
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

    res.json({ activeLog: activeLog || null }); // Return activeLog or null explicitly

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

    res.json({ logs }); // Return logs in an object

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

    // Security check: Ensure authenticated user can only view their own logs
    // Or, if an admin is allowed to view others' logs, add role check here
    if (requestedUserId !== authUserId && req.user.role !== 'admin') { // Assuming req.user has role
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
    // Find an active timesheet log first
    const activeLog = await Timesheet.findOne({ 
      userId, 
      clockOut: { $exists: false } 
    });

    if (!activeLog) {
      return res.json({ activeBreak: null }); // No active clock-in, so no active break possible
    }

    // A break is usually a field *within* the activeTimesheet,
    // or a separate "Break" model linked to the Timesheet.
    // For simplicity, let's assume it's a flag/status on the activeLog itself or a separate linked model.
    // As per previous code, we're assuming a property on activeLog indicating active break.
    // If your Timesheet model doesn't have break fields, you'd need a separate Break model.
    // For now, let's mock it or assume a simpler structure from your existing Timesheet model.
    // Assuming 'activeBreak' status is determined by some logic on the activeLog.
    // If you have a separate Breaks collection:
    // const activeBreak = await Break.findOne({ timesheetId: activeLog._id, endTime: { $exists: false } });

    // For now, let's return a mock if activeLog exists, or if there's a specific break property in Timesheet.
    // If your Timesheet model supports breaks within it, it might look like this:
    // if (activeLog.currentBreak && !activeLog.currentBreak.endTime) {
    //   return res.json({ activeBreak: activeLog.currentBreak });
    // }

    // Mocking an active break for demonstration if there's an active log
    let activeBreakData = null;
    if (activeLog && activeLog.breakStarted && !activeLog.breakEnded) { // Assuming your Timesheet model has these fields
        activeBreakData = {
            timesheetId: activeLog._id,
            startTime: activeLog.breakStarted, // This would be the break start time
            // Add other break related fields from your model
        };
    }
    // If you don't have break-specific fields in Timesheet, this mock will always be null unless you add them
    // For this example, let's assume you've added fields like `currentBreakStatus: { type: String }`, `breakStartTime: Date`, `breakEndTime: Date` to Timesheet.model.js
    // Or for simplicity, we'll just check if the activeLog itself implies a break.

    // Given the lack of break-specific fields in Timesheet.model.js, we need to adapt.
    // A common way is a nested object or a separate collection.
    // Let's assume for now, activeBreak is managed by flags on the Timesheet for simplicity,
    // and if it exists, it implies an active break.
    // If the Timesheet model has `breakStart: Date` and `breakEnd: Date` for the *current* break:
    const activeTimesheetForBreakCheck = await Timesheet.findOne({ 
      userId, 
      clockOut: { $exists: false },
      breakStart: { $exists: true },
      breakEnd: { $exists: false }
    });

    if (activeTimesheetForBreakCheck) {
      activeBreakData = {
        timesheetId: activeTimesheetForBreakCheck._id,
        startTime: activeTimesheetForBreakCheck.breakStart,
        // Potentially other break details
      };
    }


    res.json({ activeBreak: activeBreakData });

  } catch (error) {
    console.error('Active break error:', error);
    res.status(500).json({ error: 'Failed to get active break' });
  }
};
