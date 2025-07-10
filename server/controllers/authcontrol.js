// server/controllers/authcontrol.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Ensure the path is correct to your User model

// Load secrets and expiry from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || JWT_SECRET; // Fallback to JWT_SECRET if refresh secret not set
const ACCESS_TOKEN_EXPIRY = process.env.JWT_EXPIRES_IN || '1h'; // Use JWT_EXPIRES_IN from .env
const REFRESH_TOKEN_EXPIRY = '7d'; // Hardcoded for refresh token, consider adding to .env

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || 12);

// In a real application, you'd store refresh tokens in a database (e.g., Redis or MongoDB)
// For simplicity, we'll use an in-memory Set for demonstration (NOT PRODUCTION READY)
const refreshTokens = new Set(); // Stores valid refresh tokens

export const register = async (req, res) => {
  const { name, email, password, department, role, pin } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: { message: 'User already exists with this email.' } });
    }

    // Password and PIN hashing are handled by pre-save hooks in user.js model
    user = new User({
      name,
      email,
      password,
      department: department || 'general',
      role: role || 'employee',
      pin, // This will be hashed by the pre-save hook
    });

    await user.save(); // This triggers the pre-save hooks for hashing

    res.status(201).json({ message: 'User registered successfully', data: { userId: user._id, email: user.email } });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: { message: 'Server error during registration.' } });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: { message: 'Invalid credentials.' } });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: { message: 'Invalid credentials.' } });
    }

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      department: user.department,
      name: user.name
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

    refreshTokens.add(refreshToken); // Store refresh token (in-memory, for demo only)

    res.json({
      message: 'Logged in successfully',
      data: {
        accessToken,
        refreshToken, // Send refresh token to client
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
    res.status(500).json({ error: { message: 'Server error during login.' } });
  }
};

export const verifyPin = async (req, res) => {
  const { pin } = req.body;
  // For PIN login, a more secure approach would be to send an identifier (e.g., employeeId or email)
  // along with the PIN. For now, we'll find a user by matching the PIN.
  // This is NOT ideal for production security if PINs are not unique or are easily guessable.

  try 
    // Find all users with a PIN set and iterate to compare hashed PINs
    {
      const usersWithPin = await User.find({ pin: { $exists: true, $ne: null, $ne: '' } });
    let foundUser = null;

    for (const user of usersWithPin) {
        if (user.pin && await bcrypt.compare(pin, user.pin)) {
            foundUser = user;
            break;
        }
    }

    if (!foundUser) {
      return res.status(401).json({ error: { message: 'Invalid PIN.' } });
    }

    const payload = {
      userId: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
      department: foundUser.department,
      name: foundUser.name
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

    refreshTokens.add(refreshToken); // Store refresh token

    res.status(200).json({
      message: 'PIN verified successfully',
      data: {
        accessToken,
        refreshToken,
        user: {
          userId: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          department: foundUser.department
        }
      }
    });

  } catch (error) {
    console.error('Error verifying PIN:', error);
    res.status(500).json({ error: { message: 'Server error during PIN verification.' } });
  }
};

export const verifyToken = (req, res) => {
  // This controller is reached if the 'authenticate' middleware succeeds.
  // The 'authenticate' middleware has already verified the token and attached user info to req.user
  if (req.user) {
    // Return the user data that was decoded from the token by the middleware
    res.status(200).json({ valid: true, user: req.user, message: 'Token is valid' });
  } else {
    // This case should ideally not be reached if authenticate middleware works correctly
    res.status(401).json({ valid: false, message: 'Invalid token or no user info' });
  }
};

export const logout = (req, res) => {
  const { refreshToken } = req.body; // Assuming refresh token is sent in body for logout

  if (refreshToken && refreshTokens.has(refreshToken)) {
    refreshTokens.delete(refreshToken); // Remove refresh token from our in-memory store
  }
  // Client-side will also clear access token
  res.status(200).json({ message: 'Logged out successfully' });
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokens.has(refreshToken)) {
    return res.status(403).json({ error: { message: 'Refresh Token Required or Invalid.' } });
  }

  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, userPayload) => {
    if (err) {
      refreshTokens.delete(refreshToken); // Remove invalid/expired refresh token
      return res.status(403).json({ error: { message: 'Invalid Refresh Token.' } });
    }

    // Re-create payload for new access token, excluding iat and exp from old token
    const newPayload = {
      userId: userPayload.userId,
      email: userPayload.email,
      role: userPayload.role,
      department: userPayload.department,
      name: userPayload.name
    };

    const newAccessToken = jwt.sign(newPayload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const newRefreshToken = jwt.sign(newPayload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

    // Invalidate old refresh token and add new one (if using persistent store, this is crucial)
    refreshTokens.delete(refreshToken);
    refreshTokens.add(newRefreshToken);

    res.json({
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: newPayload // Send updated user payload if needed, or just rely on frontend to keep it
      }
    });
  });
};
