import jwt from "jsonwebtoken";
import { accessToken } from "node-auth/app";

const requireAuth = (req, res, next) => {
	let token = req.headers.authorization !== undefined ? req.headers.authorization.split(' ')[1] : null;

	if(token) {
		jwt.verify(token, accessToken, err => {
			err ? res.status(405).json({ error: err.message }) : next();
		});
	} else {
		return res.status(405).json({ message: "Unauthenticated" });
	}
	
}

export { requireAuth };