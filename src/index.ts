import * as dotenv from "dotenv";
dotenv.config();
import Datasource from "./init/Datasource";
import Server from "./init/Server";
import App from "./init/App";

const app = App.init();

Datasource.connect();
Server.init(app);
