import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			minlength: 3,
		},
		fullName: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			select: false,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				default: [],
			},
		],
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				default: [],
			},
		],
		profilePicture: {
			type: String,
			default: '',
		},
		coverPicture: {
			type: String,
			default: '',
		},
		bio: {
			type: String,
			default: '',
		},
		link: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true, versionKey: false }
);

const User = mongoose.model('User', userSchema);
export default User;
