import ApiUser from "../model/ApiUser";

const findByUsername = async (username: string) =>
  ApiUser.m.findOne({ username: username }).orFail().exec();

export default { findByUsername };
