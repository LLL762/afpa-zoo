import { NextFunction, Request, Response } from "express";
import { sendJsonResp } from "../model/IJsonResp";
import ZoneService from "../service/ZoneService";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.params.nb);
    const pageIndex = req.query.page ? +req.query.page : NaN;
    const pageSize = req.query.size ? +req.query.size : NaN;

    const data = await ZoneService.findAll(pageIndex, pageSize);
    const json = {
      url: req.url,
      method: req.method,
      statusCode: 200,
      timestamp: Date.now(),
      data: data,
    };
    sendJsonResp(json, res);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.id;
    const zone = await ZoneService.findById(_id);
    const json = {
      url: req.url,
      method: req.method,
      statusCode: 200,
      timestamp: Date.now(),
      data: { zone: zone },
    };
    sendJsonResp(json, res);
  } catch (error) {
    next(error);
  }
};

export default { getAll, getById };
