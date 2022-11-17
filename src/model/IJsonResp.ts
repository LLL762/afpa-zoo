import { Response } from "express";

export interface IJsonResp {
  readonly url: string;
  readonly method: string;
  readonly statusCode: number;
  readonly timestamp: number;
  readonly data?: any;
  readonly errors?: any;
}

export const sendJsonResp = (json: IJsonResp, res: Response) => {
  res.json(json);
};
