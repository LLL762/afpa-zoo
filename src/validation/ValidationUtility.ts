import { NextFunction, Request, Response } from "express";

import Ajv from "ajv";
import { header, param, query } from "express-validator";
import { BadRequestError } from "../error/BadRequestError";

const isValidJsonSchema = (json: object) => {
  try {
    new Ajv().compile(json);
    return true;
  } catch (error) {
    return false;
  }
};

const checkIdReqParam = async () =>
  param("id")
    .exists()
    .withMessage("missing required parameter id")
    .bail()
    .isMongoId()
    .withMessage("id parameter must be a valid mongoId");

const checkContentType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.headers["content-type"] == "application/json"
    ? next()
    : next(
        new BadRequestError("content-type must be application/json", {
          type: "BadRequestError",
          message: "Content type must be application/json",
        })
      );
};

const checkPageQueryParam = async () => {
  query("size").isInt({ min: 1 }).withMessage("").toInt();

  query("page").isInt({ min: 1 }).withMessage("").toInt();
};

export default {
  isValidJsonSchema,
  checkIdReqParam,
  checkPageQueryParam,
  checkContentType,
};
