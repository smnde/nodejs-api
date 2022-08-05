import mongoose from "mongoose";
import { database, dbHost, dbUsername, dbPassword } from "node-auth/app";

const connect = mongoose.connect(database,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Database connected'))
	.catch(err => console.log(err.message));

export default connect;