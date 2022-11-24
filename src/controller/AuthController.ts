import { Request, Response, NextFunction } from "express";
import passport from "passport";
import Authentication from "../auth/Authentication";
import { IJwtRefreshPayload } from "../jwt/JwtUtil";
import { TypeApiUser } from "../model/ApiUser";
import ApiUserRepo from "../repo/ApiUserRepo";
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

const handleRefreshJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = (req.user as IJwtRefreshPayload).username;
    const user = await ApiUserRepo.findByUsername(username);
    Authentication.onSuccess(res, user);
  } catch (error) {
    next(error);
  }
};

export default { handleAuthRequest, handleRefreshJwt };
