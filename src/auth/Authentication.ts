import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import ApiUserRepo from "../repo/ApiUserRepo";
import { Response } from "express";
import JwtUtil from "../jwt/JwtUtil";
import { TypeApiUser } from "../model/ApiUser";
import { Doc } from "../utility/TsTypes";

const reqProps = { usernameField: "username", passwordField: "password" };

const configs = {
  session: false,
};

const strategy = new Strategy(reqProps, async (username, password, done) => {
  const user = await ApiUserRepo.findByUsername(username);
  const areCredentialsOk = user
    ? await bcrypt.compare(password, user.password)
    : false;
  return areCredentialsOk
    ? done(null, user)
    : done(null, false, { message: "Incorrect credentials" });
});

const onSuccess = (res: Response, user: Doc<TypeApiUser>) => {
  res.setHeader("Authorization", "Bearer " + JwtUtil.createJwt(user));
  res.status(200).send("Authentication successful");
};
const onFaillure = (res: Response) => {
  res.status(401).send("Bad credentials");
};
const onError = (res: Response) => {
  res.status(500).send("Unexpected server error");
};

export default { strategy, configs, onSuccess, onFaillure, onError };
