import { Request, Response, NextFunction } from "express";
import passport from "passport";
import Authentication from "../auth/Authentication";
import { TypeApiUser } from "../model/ApiUser";
import { Doc } from "../utility/TsTypes";

const handleAuthRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await passport.authenticate(
      "local",
      Authentication.configs,
      (err, user, info) => {
        handleAuthResult(err, user, res);
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

const handleAuthResult = (err: any, user: Doc<TypeApiUser>, res: Response) => {
  if (err) {
    Authentication.onError(res);
    return;
  }
  return user
    ? Authentication.onSuccess(res, user)
    : Authentication.onFaillure(res);
};

export default { handleAuthRequest };
