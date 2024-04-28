import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';

import User from '../models/user.model.js';
import Notification from '../models/notification.model.js';

export const getUserProfile = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findOne({ username }).select('-password');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error('Error in getUserProfile', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const followUnfollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString()) {
			return res
				.status(403)
				.json({ error: 'You cannot follow/unfollow yourself' });
		}

		if (!userToModify || !currentUser) {
			return res.status(404).json({ error: 'User not found' });
		}

		const isFollowing = currentUser.following.includes(id);
		if (isFollowing) {
			// unfollow the user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
			res.status(200).json({ message: 'User unfollowed successfully' });
		} else {
			// follow the user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			// create notification
			const newNotification = new Notification({
				type: 'follow',
				from: req.user._id,
				to: userToModify._id,
			});
			await newNotification.save();

			res.status(200).json({ message: 'User followed successfully' });
		}
	} catch (error) {
		console.error('Error in followUnfollowUser', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const getSuggestedUsers = async (req, res) => {
	try {
		const userId = req.user._id;
		const usersFollowedByMe = await User.findById(userId).select('following');
		const users = await User.aggregate([
			{ $match: { _id: { $ne: userId } } },
			{ $sample: { size: 10 } },
		]);

		const filterdUsers = users.filter(
			(user) => !usersFollowedByMe.following.includes(user._id)
		);
		const suggestedUsers = filterdUsers.slice(0, 4);

		suggestedUsers.forEach((user) => (user.password = null));
		res.status(200).json(suggestedUsers);
	} catch (error) {
		console.error('Error in getSuggestedUsers', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const updateUser = async (req, res) => {
	const {
		fullName,
		email,
		username,
		currentPassword,
		newPassword,
		bio,
		link,
	} = req.body;
	let { profilePicture, coverPicture } = req.body;

	const userId = req.user._id;

	try {
		let user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: 'User not found' });

		if (
			(!newPassword && currentPassword) ||
			(!currentPassword && newPassword)
		) {
			return res
				.status(400)
				.json({
					error: 'Please provide both current password and new password',
				});
		}

		if (currentPassword && newPassword) {
			const isMatch = await bcrypt.compare(currentPassword, user.password);
			if (!isMatch)
				return res.status(400).json({ error: 'Current password is incorrect' });
			if (newPassword.length < 8) {
				return res
					.status(400)
					.json({ error: 'Password must be at least 8 characters long' });
			}

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(newPassword, salt);
		}

		if (profilePicture) {
			if (user.profilePicture) {
				// https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
				await cloudinary.uploader.destroy(
					user.profilePicture.split('/').pop().split('.')[0]
				);
			}

			const uploadedResponse = await cloudinary.uploader.upload(profilePicture);
			profilePicture = uploadedResponse.secure_url;
		}

		if (coverPicture) {
			if (user.coverPicture) {
				await cloudinary.uploader.destroy(
					user.coverPicture.split('/').pop().split('.')[0]
				);
			}

			const uploadedResponse = await cloudinary.uploader.upload(coverPicture);
			coverPicture = uploadedResponse.secure_url;
		}

		user.fullName = fullName || user.fullName;
		user.email = email || user.email;
		user.username = username || user.username;
		user.bio = bio || user.bio;
		user.link = link || user.link;
		user.profilePicture = profilePicture || user.profilePicture;
		user.coverPicture = coverPicture || user.coverPicture;

		user = await user.save();

		// password should be null in response
		user.password = null;

		return res.status(200).json(user);
	} catch (error) {
		console.log('Error in updateUser: ', error.message);
		res.status(500).json({ error: error.message });
	}
};
