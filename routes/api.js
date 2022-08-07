import { express } from "node-auth/app";
import { login } from "node-auth/LoginController";
import { requireAuth } from "node-auth/Authenticated";
import {
	getUsers,
	getUserById,
	storeUser,
	updateUser,
	changePassword,
	destroyUser
} from "node-auth/UsersController";
import {
	getProducts,
	getProductById,
	storeProduct,
	updateProduct,
	destroyProduct,
} from "../app/controllers/ProductsController.js";


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


route.get('/products', requireAuth, getProducts);
route.get('/product/:id', requireAuth, getProductById);
route.post('/product', requireAuth, storeProduct);
route.patch('/product/:id', requireAuth, updateProduct);
route.delete('/product/:id', requireAuth, destroyProduct);

// actually this is no use, but if we want to imported this file (api.js), we should export default something. and i do this, it's works fine.
export default route;