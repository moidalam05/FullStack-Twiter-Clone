import { v2 as cloudinary } from 'cloudinary';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';

export const createPost = async (req, res) => {
	try {
		const { text } = req.body;
		let { img } = req.body;
		const userId = req.user._id.toString();
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		if (!text && !img) {
			return res.status(400).json({ error: 'Post must have Text or image' });
		}
		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}
		const newPost = new Post({
			user: userId,
			text,
			img,
		});
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		console.log('Error in CreatePost', error.message);
		res.status(500).json({ error: 'Internal server error' });
	}
};
