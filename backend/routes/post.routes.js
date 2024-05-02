import express from 'express';
import { protectedRoute } from '../middlewares/protectRoute.js';
import {
	commentOnPost,
	createPost,
	deletePost,
	getAllPosts,
	getFollowingPosts,
	getLikedPosts,
	likeUnlikePost,
} from '../controllers/post.controller.js';
const router = express.Router();

router.get('/all', protectedRoute, getAllPosts);
router.get('/following', protectedRoute, getFollowingPosts);
router.get('/likes/:id', protectedRoute, getLikedPosts);
router.post('/create', protectedRoute, createPost);
router.post('/like/:id', protectedRoute, likeUnlikePost);
router.post('/comment/:id', protectedRoute, commentOnPost);
router.delete('/:id', protectedRoute, deletePost);

export default router;
