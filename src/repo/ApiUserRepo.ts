import ApiUser from "../model/ApiUser";

const findByUsername = async (username: string) =>
  ApiUser.m.findOne({ username: username }).orFail().exec();

const findByIdIn = (ids: string[]) => {
  return ApiUser.m.find({ _id: { $in: ids } }, { _id: 1 }).exec();
};

const existById = async (id: string) => {
  return ApiUser.m.exists({ _id: id }).exec();
};

export default { findByUsername, findByIdIn, existById };
