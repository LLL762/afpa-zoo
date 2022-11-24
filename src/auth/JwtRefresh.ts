import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import TokenFilter from "./TokenFilter";

const secret = process.env.JWT_SECRET as string;
const verify = (payload: any, done: VerifiedCallback) => done(null, payload);

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
    secretOrKey: secret,
  },
  verify
);

const filter = async (req: Request, res: Response, next: NextFunction) => {
  await passport.authenticate("jwt", { session: false }, (err, payload, info) =>
    TokenFilter.handleValidationResult(err, payload, info, req, next)
  )(req, res, next);
};

export default { strategy, filter };
