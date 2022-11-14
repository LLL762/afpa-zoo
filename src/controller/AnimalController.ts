import { NextFunction, Request, response, Response } from "express";
import UriConfigs from "../configs/UriConfigs";
import Animal from "../model/Animal";
import { IJsonResp } from "../model/IJsonResp";

const getAllHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animals = await Animal.m.find({}).orFail().exec();
    let data: any[] = [];

    for (let animal of animals) {
      data.push({
        url: UriConfigs.URIS.base + UriConfigs.URIS.animals + "/" + animal._id,
        resource: animal,
      });
    }

    res.json({
      url: req.url,
      method: req.method,
      statusCode: 200,
      data: data,
    } as IJsonResp);
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
    const animals = await Animal.m.find({ _id: req.params.id }).orFail().exec();

    res.json({
      url: req.url,
      method: req.method,
      statusCode: 200,
      data: animals,
    } as IJsonResp);
  } catch (err) {
    next(err);
  }
};

export default { getAllHandler, getByIdHandler };
