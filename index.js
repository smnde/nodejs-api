import { app, port } from "node-auth/app";
import bodyParser from "body-parser";
import cors from "cors";
import "node-auth/db";
import api from "node-auth/api";

app.use(bodyParser.json());
app.use(cors());
app.use(api);

app.listen(port, () => {
	console.log(`Running at http://localhost:${port}`);
});