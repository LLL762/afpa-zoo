import { NextFunction, Request, Response } from "express";
import { sendDefaultResp } from "../model/IJsonResp";
import EnclosureService from "../service/EnclosureService";

const getByZoneId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zoneId = req.params.id;
    const pageIndex = req.query.page ? +req.query.page : NaN;
    const pageSize = req.query.size ? +req.query.size : NaN;
    const data = await EnclosureService.findByZoneId(
      zoneId,
      pageIndex,
      pageSize
    );
    sendDefaultResp(req, res, data);
  } catch (error) {
    next(error);
  }
};

export { getByZoneId };
