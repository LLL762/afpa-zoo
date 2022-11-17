import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import { sendJsonResp } from "../../model/IJsonResp";
import { BadRequestError } from "../BadRequestError";

const handle = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  console.log("--------------------------------");

  if (err instanceof Error.DocumentNotFoundError) {
    res.status(404).json({
      status: 404,
      url: req.url,
      error: "Requested resource does not exist",
    });
    return;
  }

  if (err instanceof BadRequestError) {
    const json = {
      url: req.url,
      method: req.method,
      statusCode: 400,
      timestamp: Date.now(),
      errors: err.details,
    };

    sendJsonResp(json, res);
    return;
  }

  res.status(500).send({
    status: 500,
    url: req.url,
    error: "An unexpected error occurred",
  });
};

export default { handle };
