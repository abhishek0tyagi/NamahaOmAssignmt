import express from 'express';
import { registerUser, getUserProfile } from '../controller/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { loginUser } from '../controller/user.controller';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', authMiddleware, getUserProfile);

export default router;
