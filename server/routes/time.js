// server/routes/time.js
import express from 'express';
import * as tsCtrl from '../controllers/timesheet.controller.js';
import { authenticate } from '../middleware/middleAuth.js';

const router = express.Router();

// Apply authentication middleware to all time-related routes
router.use(authenticate);

router.post('/clock-in', tsCtrl.clockIn);
router.post('/clock-out', tsCtrl.clockOut);
router.get('/active-log', tsCtrl.getActiveLog);
router.get('/today-logs', tsCtrl.getTodaysLogs);
router.get('/logs/:userId', tsCtrl.getUserLogs); // Fixed parameter name
router.get('/active-break/:userId', tsCtrl.getActiveBreak); // Fixed parameter name

export default router;