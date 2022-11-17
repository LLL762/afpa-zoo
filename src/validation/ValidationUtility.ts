import { NextFunction, Request, Response } from "express";

import Ajv from "ajv";
import { param, query } from "express-validator";
import { BadRequestError } from "../error/BadRequestError";

const isValidJsonSchema = (json: object) => {
  try {
    new Ajv().compile(json);
    return true;
  } catch (error) {
    return false;
  }
};

const checkIdReqParam = () =>
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
        status: 400,
        message: "Content type must be application/json",
      })
    );
};

const checkSizeQueryParam = () =>
  query("size")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Query parameter size must be an integer greater or equal to 1"
    )
    .toInt();

const checkPageQueryParam = () =>
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Query parameter page must be an integer greater or equal to 1"
    )
    .toInt();

const checkPageQueryParams = () => [
  checkSizeQueryParam(),
  checkPageQueryParam(),
];


export default {
  isValidJsonSchema,
  checkIdReqParam,
  checkPageQueryParams,
  checkContentType,
};
