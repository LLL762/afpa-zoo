import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import ApiUserRepo from "../repo/ApiUserRepo";
import { Response } from "express";
import JwtUtil from "../jwt/JwtUtil";
import { TypeApiUser } from "../model/ApiUser";
import { Doc } from "../utility/TsTypes";
import { Error } from "mongoose";

const reqProps = { usernameField: "username", passwordField: "password" };

const configs = {
  session: false,
};

const strategy = new Strategy(reqProps, async (username, password, done) => {
  try {
    const user = await ApiUserRepo.findByUsername(username);
    const areCredentialsOk = user
      ? await bcrypt.compare(password, user.password)
      : false;
    return areCredentialsOk
      ? done(null, user)
      : done(null, false, { message: "Incorrect credentials" });
  } catch (error) {
    if (error instanceof Error.DocumentNotFoundError) {
      return done(null, false, { message: "Incorrect credentials" });
    }
    return done(error);
  }
});

const onSuccess = (res: Response, user: Doc<TypeApiUser>) => {
  res.setHeader("Authorization", "Bearer " + JwtUtil.createJwt(user));
  res.setHeader("Access-Control-Expose-Headers", "Authorization");
  res.status(200).json({
    message: "authentication successfull",
    refreshToken: JwtUtil.createRefreshToken(user),
  });
};
const onFaillure = (res: Response) => {
  res.status(401).send("Bad credentials");
};
const onError = (res: Response) => {
  res.status(500).send("Unexpected server error");
};

export default { strategy, configs, onSuccess, onFaillure, onError };
