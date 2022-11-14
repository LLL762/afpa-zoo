import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";

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

  res.status(500).send({
    status: 500,
    url: req.url,
    error: "An unexpected error occurred",
  });
};

export default { handle };
