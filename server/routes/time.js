// server/routes/time.js - Handles time logging routes
import express from 'express';
// Assuming tsCtrl has named exports for its functions
import * as tsCtrl from '../models/timesheet.controller.js'; // Use named import for tsCtrl's functions
import { authenticate } from '../middleware/middleAuth.js'; // Corrected: Import 'authenticate' as a named export


const router = express.Router();

// Apply authentication middleware to all time-related routes
router.use(authenticate);

router.post('/clock-in', tsCtrl.clockIn);
router.post('/clock-out', tsCtrl.clockOut);
router.get('/active-log', tsCtrl.getActiveLog);
router.get('/today-logs', tsCtrl.getTodaysLogs);
router.get('/logs/:userId', tsCtrl.getUserLogs); // Adding a route for getting all user logs, used by TimeLogsTable
router.get('/active-break/:userId', tsCtrl.getActiveBreak); // Adding a route for active break

export default router;
