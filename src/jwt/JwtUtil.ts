import { TypeApiUser } from "../model/ApiUser";
import { Doc } from "../utility/TsTypes";
import jwt from "jsonwebtoken";
import UriConfigs from "../configs/UriConfigs";
import { TypeRole } from "../model/Role";
import { TypePermission } from "../model/Permission";

const secret = process.env.JWT_SECRET as string;
const expirationInSeconds = +(process.env.JWT_EXPIRATION_SECOND ?? 350);

const options = {
  expiresIn: expirationInSeconds,
  issuer: UriConfigs.URIS.base,
  audience: UriConfigs.URIS.base,
} as const;

const refreshOptions = {
  expiresIn: expirationInSeconds * 2,
  issuer: UriConfigs.URIS.base,
  audience: UriConfigs.URIS.base,
} as const;

const createJwt = (user: Doc<TypeApiUser>) =>
  jwt.sign(createPayload(user), secret, options);

const createRefreshToken = (user: Doc<TypeApiUser>) => {
  return jwt.sign({ username: user.username }, secret, refreshOptions);
};

const createPayload = (user: Doc<TypeApiUser>) => {
  return {
    username: user.username,
    id: user._id,
    role: user.role,
    permissions: user.permissions,
  };
};

export interface IJwtPayload {
  username: string;
  id: string;
  role?: TypeRole;
  permissions?: [TypePermission];
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export interface IJwtRefreshPayload {
  username: string;
  id: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export default { createJwt, createRefreshToken };
