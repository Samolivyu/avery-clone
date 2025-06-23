// server/routes/time.js
const express = require('express');
const router = express.Router();
const timeController = require('../controllers/timeController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/clock-in', timeController.clockIn);
router.post('/clock-out', timeController.clockOut);
router.post('/break', timeController.manageBreak);

module.exports = router;