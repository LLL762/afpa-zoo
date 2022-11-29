import mongoose from "mongoose";
import Animal from "../model/Animal";
import ApiUser from "../model/ApiUser";
import Enclosure from "../model/Enclosure";
import EnclosureType from "../model/EnclosureType";
import Specy from "../model/Specy";
import Task from "../model/Task";
import Zone from "../model/Zone";

const configs = {
  dbUrl: process.env.DATASOURCE_URL as string,
  user: process.env.DATASOURCE_USER as string,
  pass: process.env.DATASOURCE_PASSWORD as string,
  dbName: process.env.DATASOURCE_DB_NAME as string,
  models: [
    Animal.m,
    Enclosure.m,
    EnclosureType.m,
    Zone.m,
    ApiUser.m,
    Specy.m,
    Task.m,
  ],
} as const;

const connect = async () => {
  await mongoose.connect(configs.dbUrl, {
    user: configs.user,
    pass: configs.pass,
    dbName: configs.dbName,
  });
  mongoose.set("debug", true);

  for (let model of configs.models) {
    model.init();
  }
  mongoose.connection.on("error", (err) => console.log(err));
};

export default { configs, connect };
