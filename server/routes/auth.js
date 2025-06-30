// server/routes/auth.js - Handles user authentication routes
import express from 'express';
// Assuming authController has named exports for its functions (register, login, verifyToken, verifyPin)
import * as authController from '../controllers/authcontrol.js';
// Corrected: Import named exports from middleAuth.js if you use them here
import { authenticate } from '../middleware/middleAuth.js'; 

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/pin-login', authController.verifyPin); // Handle PIN login

// Protected routes (authentication required)
// Example: Verify token endpoint. The 'authenticate' middleware runs first.
router.get('/verify-token', authenticate, authController.verifyToken);

export default router;