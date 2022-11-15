import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ZoneMock from "../mock-data/ZoneMock";
import Zone from "../../model/Zone";


let mongoServer: MongoMemoryServer | undefined;
let uri: string;

const init = async () => {
  await Zone.m.init();
}


const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  uri = mongoServer.getUri();

  await mongoose.connect(uri);

  mongoose.set("debug", true);
  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${uri}`);
  });

  await init();
};

const close = async () => {
  await mongoose.disconnect();
  await mongoServer?.stop();
}

const populate = async () => {
  await ZoneMock.insert();
}



const clean = async () => {


}


export default { connect, close, populate };
