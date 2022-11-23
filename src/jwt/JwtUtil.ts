import { TypeApiUser } from "../model/ApiUser";
import { Doc } from "../utility/TsTypes";
import jwt from "jsonwebtoken";
import UriConfigs from "../configs/UriConfigs";

const secret = process.env.JWT_SECRET as string;
const expirationInSeconds = +(process.env.JWT_EXPIRATION_SECOND ?? 350);

const options = {
  expiresIn: expirationInSeconds,
  issuer: UriConfigs.URIS.base,
  audience: UriConfigs.URIS.base,
} as const;

const createJwt = (user: Doc<TypeApiUser>) =>
  jwt.sign(createPayload(user), secret, options);

const createPayload = (user: Doc<TypeApiUser>) => {
  return {
    username: user.username,
    role: user.role,
    persmissions: user.permissions,
  };
};

export default { createJwt };
