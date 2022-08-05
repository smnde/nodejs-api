import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "node-auth/UserModel";
import { accessToken } from "node-auth/app";

const login = async (req, res) => {
	// find user by username
	await User.findOne({ username: req.body.username })
		.then(user => {
			// if username wrong or user is not exists.
			if(!user) return res.status(404).json({ message: "User tidak ada" });
			// compare request password and user password.
			bcrypt.compare(req.body.password, user.password)
				.then(isValidPassword => {
					// if password is valid
					if(isValidPassword) {
						const { _id, username } = user;
						// generate jwt token.
						jwt.sign({ _id, username }, accessToken, { expiresIn: 86400 }, (err, token) => {
							if(err) return res.json({ message: err.message });
							res.status(200).json(
								{
									message: "Login berhasil",
									data: {user, token},
								}
							);
						});
					} else {
						return res.status(405).json({ message: "Username dan password tidak valid" });
					}
				}).catch(err => res.json({ message: err.message }));
		}).catch(err => res.json({ message: err.message }));
}
export { login };