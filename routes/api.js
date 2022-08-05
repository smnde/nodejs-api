import { express } from "node-auth/app";
import {
	getUsers,
	getUserById,
	storeUser,
	updateUser,
	changePassword,
	destroyUser
} from "node-auth/UsersController";
import { login } from "node-auth/LoginController";
import { requireAuth } from "node-auth/Authenticated";

const route = express.Router();


// Auth routes
route.post('/register', storeUser);
route.post('/login', login);

// Dashboard / root
route.get('/', requireAuth, (req, res) => {
	res.send('root');
});

// User routes
route.get('/users', requireAuth, getUsers);
route.get('/users/:id', requireAuth, getUserById);
route.post('/users', requireAuth, storeUser);
route.patch('/users/:id', requireAuth, updateUser);
route.put('/users/:id', requireAuth, changePassword);
route.delete('/users/:id', requireAuth, destroyUser);


// actually this is no use, but if we want to imported this file (api.js), we should export default something. and i do this, it's works fine.
export default route;