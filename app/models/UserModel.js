import mongoose from "mongoose";

const User = new mongoose.Schema(
	{
		fullname: { type: String, required: true },
		username: { type: String, required: true },
		role: { type: String, required: false },
		password: { type: String, required: true }
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export default mongoose.model('Users', User);