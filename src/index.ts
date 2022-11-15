import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import logger from "morgan";
import Datasource from "./init/Datasource";
import Server from "./init/Server";
import cors from "cors";
import GlobalErrorHandler from "./error/handler/GlobalErrorHandler";
import { initRouter } from "./init/RouterInit";
import EnclosureType from "./model/EnclosureType";
import Ajv from "ajv";
import { CustomError } from "./error/CustomError";

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());

Datasource.connect();
Server.init(app);

initRouter(router);

app.use(router);
app.use(GlobalErrorHandler.handle);

/* AnimalsMock.insert(); */

/* EnclosureTypeMock.insert(); */

const test = async () => {
  const type = await EnclosureType.m
    .findOne({ name: "Vivarium" })
    .orFail()
    .exec();

  console.log(type.validationSchema);
  const r = undefined;

  const validate = new Ajv().compile(type.validationSchema);
  console.log(validate({ temperatureInCelsius: 23, hygrometry: 47 }));
  console.log(validate.errors);
};

test();
