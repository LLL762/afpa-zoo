import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import ValidationMsg from "../../messages/ValidationMsg";
import { sendJsonResp } from "../../model/IJsonResp";
import { CustomError } from "../CustomError";

const handle = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.headers["content-type"]);

  if (err instanceof Error.DocumentNotFoundError) {
    res.status(404).json({
      status: 404,
      url: req.url,
      errors: "Requested resource does not exist",
    });
    return;
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    const json = {
      url: req.url,
      method: req.method,
      statusCode: 400,
      timestamp: Date.now(),
      errors: {
        type: "UniqueKeyError",
        message: ValidationMsg.alreadyTaken(
          Object.keys(err.keyValue)[0],
          err.keyValue.name
        ),
        details: {},
      },
    };

    res.status(400).json(json);
    return;
  }

  if (err instanceof CustomError) {
    const json = {
      url: req.url,
      method: req.method,
      statusCode: err.httpStatus ?? 500,
      timestamp: Date.now(),
      errors: err.details ?? {},
    };

    sendJsonResp(json, res, err.httpStatus);
    return;
  }

  if (err.status === 400)
    return res.status(400).json({
      url: req.url,
      method: req.method,
      statusCode: 400,
      timestamp: Date.now(),
      errors: {
        type: "BadRequestError",
        message: "Request body must be a valid json",
      },
    });

  res.status(500).send({
    status: 500,
    url: req.url,
    error: "An unexpected error occurred",
  });
};

export default { handle };
