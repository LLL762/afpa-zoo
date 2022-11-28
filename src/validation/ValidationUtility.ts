import { NextFunction, Request, Response } from "express";

import Ajv from "ajv";
import { param, query } from "express-validator";
import { BadRequestError } from "../error/BadRequestError";
import ValidationMsg from "../messages/ValidationMsg";
import UriConfigs from "../configs/UriConfigs";

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
  if (
    req.url.startsWith("/" + UriConfigs.URIS.docs) ||
    req.url.startsWith("/favicon.ico")
  ) {
    return next();
  }

  req.headers["content-type"] == "application/json"
    ? next()
    : next(
        new BadRequestError("content-type must be application/json", {
          type: "BadRequestError",
          status: 400,
          message: ValidationMsg.err.contentType,
        })
      );
};

const checkSizeQueryParam = () =>
  query("size")
    .optional()
    .isInt({ min: 1 })
    .withMessage(ValidationMsg.pageParam("size"))
    .toInt();

const checkPageQueryParam = () =>
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage(ValidationMsg.pageParam("page"))
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
