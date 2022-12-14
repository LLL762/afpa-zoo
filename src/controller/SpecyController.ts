import { NextFunction, Request, Response } from "express";
import { sendDefaultResp } from "../model/IJsonResp";
import SpecyService from "../service/SpecyService";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pageIndex = req.query.page ? +req.query.page : NaN;
    const pageSize = req.query.size ? +req.query.size : NaN;
    const data = await SpecyService.findAll(pageIndex, pageSize);
    sendDefaultResp(req, res, data);
  } catch (err) {
    next(err);
  }
};

export default { getAll };
