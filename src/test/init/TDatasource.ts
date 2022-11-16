import mongoose, { models } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ZoneMock from "../mock-data/ZoneMock";
import Zone from "../../model/Zone";
import Animal from "../../model/Animal";
import Enclosure from "../../model/Enclosure";
import EnclosureType from "../../model/EnclosureType";
import AnimalsMock from "../mock-data/AnimalsMock";
import EnclosureMock from "../mock-data/EnclosureMock";
import EnclosureTypeMock from "../mock-data/EnclosureTypeMock";
import { IMockDataUtil } from "../mock-data/IMockDataUtil";

let mongoServer: MongoMemoryServer | undefined;
let uri: string;

const configs = {
  models: [Animal.m, Enclosure.m, EnclosureType.m, Zone.m],
  mocksUtils: [
    AnimalsMock.util,
    EnclosureMock.util,
    EnclosureTypeMock.util,
    ZoneMock.util,
  ],
} as const;

const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  uri = mongoServer.getUri();

  await mongoose.connect(uri);
  for (let model of configs.models) {
    model.init();
  }

  mongoose.set("debug", true);
  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${uri}`);
  });
};

const close = async () => {
  await mongoose.disconnect();
  await mongoServer?.stop();
};

const populate = async (mocksUtils: IMockDataUtil[]) => {
  for (let mockUtil of mocksUtils.length > 0
    ? mocksUtils
    : configs.mocksUtils) {
    await mockUtil.insert();
  }
};

const clean = async () => {};

export default { connect, close, populate };
