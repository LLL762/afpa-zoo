import { NextFunction, Request, Response } from "express";
import { sendDefaultResp } from "../model/IJsonResp";
import EnclosureService from "../service/EnclosureService";

const getAll = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const pageIndex = req.query.page ? +req.query.page : NaN;
    const pageSize = req.query.size ? +req.query.size : NaN;
    const data = await EnclosureService.findAll(pageIndex, pageSize);
    sendDefaultResp(req, res, data);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const id = req.params.id;
    const data = await EnclosureService.findById(id);
    sendDefaultResp(req, res, data);
  } catch (error) {
    next(error);
  }
};




export default { getAll, getById };
