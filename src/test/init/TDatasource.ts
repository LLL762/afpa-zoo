import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  mongoose.connect(uri);

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${uri}`);
  });
};

const close = async () => {
  mongoose.connection.close();
};

export default { connect, close };
