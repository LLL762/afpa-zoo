import helmet from "helmet";
import { Express } from "express";

const middlewares = [
    helmet.frameguard(),
    helmet.noSniff(),
    helmet.hsts(),
    helmet.permittedCrossDomainPolicies()]


const init = (app: Express) => {
    app.use(middlewares);
}

export default { init }