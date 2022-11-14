import { NextFunction, Request, Response } from "express";

export interface IAppRoute {
  readonly method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  readonly uri: string;
  readonly handlers: ((
    req: Request,
    res: Response,
    next: NextFunction
  ) => void)[];
}
