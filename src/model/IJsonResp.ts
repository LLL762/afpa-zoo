import { Request, Response } from "express";

export interface IJsonResp {
  readonly url: string;
  readonly method: string;
  readonly statusCode: number;
  readonly timestamp: number;
  readonly data?: any;
  readonly errors?: any;
}

export const sendJsonResp = (
  json: IJsonResp,
  res: Response,
  httpStatus?: number
) => {
  res.status(httpStatus ?? 200).json(json);
};

export const sendDefaultResp = (
  req: Request,
  res: Response,
  data: any,
  status?: number
) => {
  res.status(status ?? 200).json(createBasicJson(req, data, status));
};

export const sendDefaultRes = (req: Request, res: Response) => {
  const status = res.locals.status ?? 200;
  res.status(status).json(createBasicJson(req, res.locals.data, status));

}

export const createBasicJson = (req: Request, data: any, status?: number) => {
  return {
    url: req.url,
    method: req.method,
    statusCode: status ?? 200,
    timestamp: Date.now(),
    data: data,
  };
};
