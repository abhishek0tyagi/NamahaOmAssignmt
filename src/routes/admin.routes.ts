import express from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controller/admin.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/role.middleware';

const router = express.Router();

// Admin-only routes
router.post('/users', authMiddleware, adminMiddleware, createUser);
router.get('/users', authMiddleware, adminMiddleware, getUsers);
router.put('/users/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
