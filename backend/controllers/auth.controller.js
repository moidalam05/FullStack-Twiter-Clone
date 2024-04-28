import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
	try {
		const { fullName, username, email, password } = req.body;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: 'Invalid email address' });
		}

		if (password.length < 8) {
			return res
				.status(400)
				.json({ error: 'Password must be at least 8 characters' });
		}

		if (fullName.length < 3) {
			return res
				.status(400)
				.json({ error: 'Full name must be at least 3 characters' });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: 'Username already exists' });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ error: 'Email already exists' });
		}

		// hashed password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			username,
			email,
			password: hashedPassword,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();
			res.status(201).json({
				_id: newUser._id,
				username: newUser.username,
				email: newUser.email,
				fullName: newUser.fullName,
				followers: newUser.followers,
				following: newUser.following,
				profilePicture: newUser.profilePicture,
				coverPicture: newUser.coverPicture,
				message: 'User registered successfully',
			});
		} else {
			res.status(400).json({ error: 'User registration failed' });
		}
	} catch (error) {
		console.error('Error in signup', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(
			password,
			user?.password || ''
		);

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: 'Invalid username or password' });
		}

		generateTokenAndSetCookie(user._id, res);
		res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			fullName: user.fullName,
			followers: user.followers,
			following: user.following,
			profilePicture: user.profilePicture,
			coverPicture: user.coverPicture,
			message: 'User logged in successfully',
		});
	} catch (error) {
		console.error('Error in login', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

export const logout = async (req, res) => {
	try {
		res.cookie('jwt', '', { maxAge: 0 });
		res.status(200).json({ message: 'User logged out successfully' });
	} catch (error) {
		console.error('Error in logout', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};
