import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		text: {
			type: String,
		},
		img: {
			type: String,
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		comments: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				text: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true, versionKey: false }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
