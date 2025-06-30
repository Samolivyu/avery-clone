// server/controllers/authcontrol.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Ensure the path is correct to your User model

// Assuming process.env.JWT_SECRET is defined in your server's .env
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_jwt_secret';
const JWT_ACCESS_EXPIRY = '1h'; // Example: 1 hour for access tokens

export const register = async (req, res) => {
  const { name, email, password, department, role, pin } = req.body; // Include pin here

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPin = pin ? await bcrypt.hash(pin, 10) : null; // Hash PIN if provided

    user = new User({
      name,
      email,
      password: hashedPassword,
      department,
      role,
      pin: hashedPin // Save hashed PIN
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', userId: user._id });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
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
      name: user.name
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRY });
    // In a real app, you'd also issue a refresh token if managing sessions this way
    res.json({
      message: 'Logged in successfully',
      data: {
        accessToken,
        user: {
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

export const verifyToken = (req, res) => {
  // This controller is reached if the 'authenticate' middleware succeeds.
  // The 'authenticate' middleware has already verified the token and attached user info to req.user
  if (req.user) {
    res.status(200).json({ valid: true, user: req.user, message: 'Token is valid' });
  } else {
    // This case should ideally not be reached if authenticate middleware works correctly
    res.status(401).json({ valid: false, message: 'Invalid token or no user info' });
  }
};

export const verifyPin = async (req, res) => {
  const { pin } = req.body;
  const userId = req.user._id; // User ID from the JWT token, populated by authenticate middleware

  if (!pin) {
    return res.status(400).json({ message: 'PIN is required' });
  }

  try {
    const user = await User.findById(userId); // Assuming User model has findById
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.pin) {
      return res.status(400).json({ message: 'User does not have a PIN set' });
    }

    // Compare the provided PIN with the hashed PIN stored in the database
    const isPinValid = await bcrypt.compare(pin, user.pin);

    if (!isPinValid) {
      return res.status(401).json({ message: 'Invalid PIN' });
    }

    // If PIN is valid, respond with success.
    res.status(200).json({ message: 'PIN verified successfully', data: { user: req.user } }); // Optionally return user data
  } catch (error) {
    console.error('Error verifying PIN:', error);
    res.status(500).json({ message: 'Server error during PIN verification' });
  }
};

// Add other authentication-related controllers here if needed (e.g., logout, refresh token)
