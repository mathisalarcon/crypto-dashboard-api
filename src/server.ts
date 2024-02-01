import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import * as database from "./setup/database";
import api from "./setup/api"
import middlewares from "./setup/middlewares";

const app = express()
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use('/api', api)
    .use(middlewares)

database.connect().then(database => {
    app.set("db", database);
    app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
});