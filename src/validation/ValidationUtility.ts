import { NextFunction, Request, Response } from "express";

import Ajv from "ajv";
import { param, query } from "express-validator";

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

const checkPageQueryParam = () => {
  query("size")
    .isInt({ min: 1 })
    .withMessage("")
    .toInt()

  query("page")
    .isInt({ min: 1 })
    .withMessage("")
    .toInt()
}









export default { isValidJsonSchema, checkIdReqParam, checkPageQueryParam };
