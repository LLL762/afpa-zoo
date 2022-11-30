import ApiUserRepo from "../repo/ApiUserRepo";

const findByUsername = async (username: string) =>
  ApiUserRepo.findByUsername(username);

const existApiUsers = async (ids: string[]): Promise<string[]> => {
  const dbUsers = await ApiUserRepo.findByIdIn(ids);

  if (ids.length == dbUsers.length) {
    return [];
  }
  const dbUsersId = dbUsers.map((user) => user._id.toString());
  const notIn = ids.filter((id) => !dbUsersId.includes(id));

  return notIn;
};

const existById = async (id: string) => {
  return ApiUserRepo.existById(id);
};

export default { findByUsername, existApiUsers, existById };
