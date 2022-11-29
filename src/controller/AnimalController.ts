import { NextFunction, Request, Response } from "express";
import Animal from "../model/Animal";
import { IJsonResp, sendDefaultResp } from "../model/IJsonResp";
import AnimalService from "../service/AnimalService";

const getAllHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pageIndex = req.query.page ? +req.query.page : NaN;
    const pageSize = req.query.size ? +req.query.size : NaN;
    const data = await AnimalService.findAll(pageIndex, pageSize);
    sendDefaultResp(req, res, data);
  } catch (err) {
    next(err);
  }
};

const getByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = await AnimalService.findById(id);

    sendDefaultResp(req, res, data);
  } catch (err) {
    next(err);
  }
};

export default { getAllHandler, getByIdHandler };
