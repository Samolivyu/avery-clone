// server/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/pin-login', authController.pinLogin);
router.post('/logout', (req, res) => {
  // Implement logout logic
});

module.exports = router;