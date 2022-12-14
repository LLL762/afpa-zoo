import * as dotenv from "dotenv";
dotenv.config();
import Datasource from "./init/Datasource";
import Server from "./init/Server";
import App from "./init/App";
import SwaggerInit from "./init/SwaggerInit";



const app = App.init();
SwaggerInit.init(app);
Datasource.connect();
Server.init(app);




