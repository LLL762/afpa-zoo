import { NextFunction, Request, Response } from "express";
import { param, validationResult } from "express-validator";
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
  return param("id")
    .not()
    .isEmpty()
    .withMessage(ValidationMsg.required("id parameter"))
    .bail()
    .isMongoId()
    .withMessage("id paramater must be a valid mongoId");
};

export default { checkRequest, validateId };
