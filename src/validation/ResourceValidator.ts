import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../error/BadRequestError";
import ValidationMsg from "../messages/ValidationMsg";
const checkRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  errors.isEmpty()
    ? next()
    : next(
        new BadRequestError("", {
          type: "BadRequestError",
          message: "Invalid request",
          details: errors.array(),
        })
      );
};

const validateId = () => {
  return body("_id")
    .not()
    .isEmpty()
    .withMessage(ValidationMsg.required("_id"))
    .bail()
    .isMongoId()
    .withMessage("_id mus be a valid mongoId");
};

export default { checkRequest, validateId };
