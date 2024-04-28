import express from 'express';
import { protectedRoute } from '../middlewares/protectRoute.js';
import { followUnfollowUser, getSuggestedUsers, getUserProfile } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/profile/:username', protectedRoute, getUserProfile);
router.get('/suggested', protectedRoute, getSuggestedUsers);
router.post('/follow/:id', protectedRoute, followUnfollowUser);
// router.post('/update', protectedRoute, updateUserProfile);

export default router;
