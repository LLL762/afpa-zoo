import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";
import { sendDefaultResp } from "../model/IJsonResp";
import Zone from "../model/Zone";
import ZoneService from "../service/ZoneService";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pageIndex = req.query.page ? +req.query.page : NaN;
    const pageSize = req.query.size ? +req.query.size : NaN;
    const data = await ZoneService.findAll(pageIndex, pageSize);
    sendDefaultResp(req, res, data);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.id;
    const zone = await ZoneService.findById(_id);
    const data = { zone: zone };
    sendDefaultResp(req, res, data);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zone = matchedData(req);
    const created = await ZoneService.create(new Zone.m(zone));
    const data = { created: created };
    sendDefaultResp(req, res, data, 201);
  } catch (error) {
    next(error);
  }
};

const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchValue = req.query.name as string;
    const searchResult = await ZoneService.searchByName(searchValue);
    const data = { zones: searchResult, searchValue: searchValue };
    sendDefaultResp(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

export default { getAll, getById, create, search };
