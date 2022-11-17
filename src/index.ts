import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import logger from "morgan";
import Datasource from "./init/Datasource";
import Server from "./init/Server";
import cors from "cors";
import GlobalErrorHandler from "./error/handler/GlobalErrorHandler";
import { initRouter } from "./init/RouterInit";
import ValidationUtility from "./validation/ValidationUtility";

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());
app.use(ValidationUtility.checkContentType);

Datasource.connect();
Server.init(app);

initRouter(router);

app.use(router);
app.use(GlobalErrorHandler.handle);
