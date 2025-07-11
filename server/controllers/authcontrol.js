import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../server/models/user.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || JWT_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.JWT_EXPIRES_IN || '1h';
const REFRESH_TOKEN_EXPIRY = '7d';

const refreshTokens = new Set();

export const register = async (req, res) => {
  const { firstName, lastName, employeeId, email, password, department, role, pin } = req.body;

  try {
    let user = await User.findOne({ $or: [{ email }, { employeeId }] });
    if (user) {
      return res.status(400).json({ 
        error: { 
          message: 'User already exists with this email or employee ID' 
        } 
      });
    }

    user = new User({
      firstName,
      lastName,
      employeeId,
      email,
      password,
      department: department || 'general',
      role: role || 'employee',
      pin,
    });

    await user.save();
    res.status(201).json({
      message: 'User registered successfully',
      data: { userId: user._id, email: user.email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: { 
        message: 'Server error during registration: ' + error.message 
      } 
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      department: user.department,
      firstName: user.firstName,
      lastName: user.lastName,
      employeeId: user.employeeId
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
    refreshTokens.add(refreshToken);

    res.json({
      accessToken,
      refreshToken,
      user: {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        department: user.department,
        employeeId: user.employeeId
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

export const verifyPin = async (req, res) => {
  const { pin } = req.body;

  try {
    const users = await User.find({ pin: { $exists: true, $ne: null } });
    let user = null;
    
    for (const u of users) {
      if (await bcrypt.compare(pin, u.pin)) {
        user = u;
        break;
      }
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid PIN' });
    }

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      department: user.department,
      firstName: user.firstName,
      lastName: user.lastName,
      employeeId: user.employeeId
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
    refreshTokens.add(refreshToken);

    res.json({
      accessToken,
      refreshToken,
      user: {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        department: user.department,
        employeeId: user.employeeId
      }
    });
  } catch (error) {
    console.error('PIN verification error:', error);
    res.status(500).json({ error: 'Server error during PIN verification' });
  }
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken || !refreshTokens.has(refreshToken)) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }

  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      refreshTokens.delete(refreshToken);
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    const payload = {
      userId: user.userId,
      email: user.email,
      role: user.role,
      department: user.department,
      firstName: user.firstName,
      lastName: user.lastName,
      employeeId: user.employeeId
    };

    const newAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const newRefreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

    refreshTokens.delete(refreshToken);
    refreshTokens.add(newRefreshToken);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  });
};

export const logout = (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens.delete(refreshToken);
  res.status(200).json({ message: 'Logged out successfully' });
};