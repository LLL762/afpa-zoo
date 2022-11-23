import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { CustomError } from "../error/CustomError";

const secret = process.env.JWT_SECRET as string;
const verify = (payload: any, done: VerifiedCallback) => done(null, payload);

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  },
  verify
);

const filter = async (req: Request, res: Response, next: NextFunction) => {
  await passport.authenticate("jwt", { session: false }, (err, payload, info) =>
    handleValidationResult(err, payload, info, req, next)
  )(req, res, next);
};

const handleValidationResult = (
  err: any,
  payload: any,
  info: any,
  req: Request,
  next: NextFunction
) => {
  if (err) {
    next(err);
  }

  if (!payload) {
    const details = { type: info.name, message: info.message };
    const error = new CustomError(info.message, 401, details);
    next(error);
  }

  req.user = payload;
  next();
};

export default { strategy, filter };
