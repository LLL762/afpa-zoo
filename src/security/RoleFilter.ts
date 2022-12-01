import AuthUtil, { RoleNameValue } from "./AuthorizationUtil";
import { Request, Response, NextFunction } from "express";
import { IJwtPayload } from "../jwt/JwtUtil";
import { MissingAuthorizationError } from "../error/MissingAuthorizationError";

const getFilter = (roleName: RoleNameValue, highter: boolean) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new Error("TokenFilter must be apply first"));
    }
    const payload = req.user as IJwtPayload;
    return AuthUtil.hasRole(roleName, payload, highter)
      ? next()
      : next(new MissingAuthorizationError(msg, errDetails(roleName, highter)));
  };
};

const msg = "You do not have permission to access or modified this resource";
const errDetails = (roleName: RoleNameValue, highter: boolean) => {
  return {
    type: "MissingAuthorizationError",
    message: msg,
    roleExpected: roleName + ` ${highter ? "or highter." : "."}`,
  };
};

export default { getFilter };
