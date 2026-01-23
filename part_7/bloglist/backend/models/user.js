import { model, Schema } from 'mongoose';

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		minlength: 3,
	},
	name: String,
	passwordHash: String,
	blogs: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Blog',
		},
	],
});

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash;
	},
});

export default model('User', userSchema);
