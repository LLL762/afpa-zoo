import mongoose from "mongoose";

const configs = {
  dbUrl: process.env.DATASOURCE_URL as string,
  user: process.env.DATASOURCE_USER as string,
  pass: process.env.DATASOURCE_PASSWORD as string,
  dbName: process.env.DATASOURCE_DB_NAME as string,
} as const;

const connect = () => {
  mongoose.connect(configs.dbUrl, {
    user: configs.user,
    pass: configs.pass,
    dbName: configs.dbName,
  });

  mongoose.connection.on("error", (err) => console.log(err));
};

export default { configs, connect };
