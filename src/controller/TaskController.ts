import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { sendDefaultResp } from "../model/IJsonResp";
import Task from "../model/Task";
import TaskService from "../service/TaskService";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pageIndex = req.query.page ? +req.query.page : NaN;
    const pageSize = req.query.size ? +req.query.size : NaN;
    const data = await TaskService.findAll(pageIndex, pageSize);
    sendDefaultResp(req, res, data);
  } catch (err) {
    next(err);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = await TaskService.findById(id);
    sendDefaultResp(req, res, data);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const task = new Task.m(req.body);
    task._id = new Types.ObjectId(id);
    const updated = await TaskService.editTask(task);
    sendDefaultResp(req, res, updated);
  } catch (err) {
    next(err);
  }
};

const addAssignTo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const task = new Task.m(req.body);
    task._id = new Types.ObjectId(id);
    const updated = await TaskService.addAssignTo(task);
    sendDefaultResp(req, res, updated);
  } catch (err) {
    next(err);
  }
};

const removeAssignTo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id;
    const userId = req.params.userId;
    const updated = await TaskService.removeAssignTo(taskId, userId);
    sendDefaultResp(req, res, updated);
  } catch (err) {
    next(err);
  }
};

const addAnimals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const task = new Task.m(req.body);
    task._id = new Types.ObjectId(id);
    const updated = await TaskService.addAnimals(task);
    sendDefaultResp(req, res, updated);
  } catch (err) {
    next(err);
  }
};

const removeAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id;
    const animalId = req.params.animalId;
    const updated = await TaskService.removeAnimal(taskId, animalId);
    sendDefaultResp(req, res, updated);
  } catch (err) {
    next(err);
  }
};

const addEnclosures = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const task = new Task.m(req.body);
    task._id = new Types.ObjectId(id);
    const updated = await TaskService.addEnclosures(task);
    sendDefaultResp(req, res, updated);
  } catch (err) {
    next(err);
  }
};

const removeEnclosure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.id;
    const enclosureId = req.params.animalId;
    const updated = await TaskService.removeEnclosure(taskId, enclosureId);
    sendDefaultResp(req, res, updated);
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,
  getById,
  update,
  addAssignTo,
  removeAssignTo,
  addAnimals,
  removeAnimal,
  addEnclosures,
  removeEnclosure,
};
