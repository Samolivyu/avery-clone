import express from 'express';
import * as authControl from '../controllers/authcontrol.js';
import { authenticate } from '../middleware/middleAuth.js';

const router = express.Router();

router.post('/register', authControl.register);
router.post('/login', authControl.login);
router.post('/pin-login', authControl.verifyPin);
router.post('/refresh', authControl.refreshToken);
router.post('/logout', authenticate, authControl.logout);

export default router;