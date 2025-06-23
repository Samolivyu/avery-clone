// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.pinLogin = async (req, res) => {
  try {
    const { pin } = req.body;
    const user = await User.findOne({});
    // Implement PIN verification logic
    if (!bcrypt.compareSync(pin, user.pin)) {
      return res.status(401).json({ error: 'Invalid PIN' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};