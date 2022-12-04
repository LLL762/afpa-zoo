import cors from "cors";
import logger from "morgan";
import express from "express";
import GlobalErrorHandler from "../error/handler/GlobalErrorHandler";
import ValidationUtility from "../validation/ValidationUtility";
import { initRouter } from "./RouterInit";
import passport from "passport";
import PassportInit from "./PassportInit";
import HelmetInit from "./HelmetInit";


const init = () => {
  const app = express();
  const router = express.Router();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger("dev"));
  HelmetInit.init(app);
  app.use(passport.initialize());
  // app.use(cors());
  app.use(ValidationUtility.checkContentType);
  PassportInit.init();
  initRouter(router);
  app.use(router);
  app.use(GlobalErrorHandler.handle);


  return app;
};

export default { init };
