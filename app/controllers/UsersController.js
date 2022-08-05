import User from "node-auth/UserModel";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
	await User.find()
		.then(users => res.json(users))
		.catch(err => res.status(500).json({message: err.message}));
}

const getUserById = async (req, res) => {
	await User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(err => res.status(404).json({message: err.message}));
}

const storeUser = async (req, res) => {
	const request = new User(req.body);

	await User.findOne({username: request.username})
		.then(user => {
			if(user) return res.json({message: "username sudah terdaftar"});
			bcrypt.hash(request.password, 10)
			.then(hash => {
				request.password = hash;
				request.save().then(user => res.json(user));
			}).catch(err => res.json({message: err.message}));
		}).catch(err => res.status(405).json({message: err.message}));
}

const updateUser = async (req, res) => {
	const { fullname, username, role } = req.body;
	await User.updateOne(
		{ _id: req.params.id },
		{ fullname, username, role }
	).then(() => res.status(200).json({message: "Success"}))
	.catch(err => res.status(400).json({message: err.message}));
}

const changePassword = async (req, res) => {
	const user = await User.findById(req.params.id);
	const isValidPassword = await bcrypt.compare(req.body.currentPassword, user.password);
	if(!isValidPassword) return res.status(403).json({message: "Password salah"});

	await bcrypt.hash(req.body.password, 10)
		.then(hash => {
			req.body.password = hash;
			User.updateOne(
				{ _id: req.params.id },
				{ password: req.body.password },
			).then(() => res.json({message: 'Success'}))
			.catch(err => res.json({message: err.message}));
		});

}

const destroyUser = async (req, res) => {
	await User.deleteOne({ _id: req.params.id })
		.then(() => res.status(200).json({message: "Success"}))
		.catch(err => res.status(400).json({message: err.message}));
}

export { getUsers, getUserById, storeUser, updateUser, changePassword, destroyUser };