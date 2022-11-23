import ApiUser from "../model/ApiUser";

const findByUsername = async (username: string) =>
  ApiUser.m.findOne({ username: username }).exec();

export default { findByUsername };
