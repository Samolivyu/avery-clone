// server/routes/auth.js - Handles user authentication routes
import express from 'express';
import * as authcontrol from '../controllers/authcontrol.js'; // Use named import for authcontrol functions
import { authenticate } from '../middleware/middleAuth.js'; // Import named export for middleware

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', authcontrol.register);      // User registration
router.post('/login', authcontrol.login);            // Email/password login
router.post('/pin-login', authcontrol.verifyPin);    // PIN login

// Protected routes (authentication required)
router.get('/verify-token', authenticate, authcontrol.verifyToken); // Verify token endpoint
router.post('/logout', authenticate, authcontrol.logout);           // Logout route
router.post('/refresh', authcontrol.refreshToken);                 // Token refresh route

export default router;