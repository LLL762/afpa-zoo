import ApiUserRepo from "../repo/ApiUserRepo";

const findByUsername = async (username: string) =>
  ApiUserRepo.findByUsername(username);

export default { findByUsername };
