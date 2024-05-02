import express from 'express';
import { protectedRoute } from '../middlewares/protectRoute.js';
import {
	deleteNotification,
	deleteNotifications,
	getNotifications,
} from '../controllers/notification.controller.js';
const router = express.Router();

router.get('/', protectedRoute, getNotifications);
router.delete('/', protectedRoute, deleteNotifications);
router.delete('/:id', protectedRoute, deleteNotification);

export default router;
