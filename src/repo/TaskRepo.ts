import Task, { TypeTask } from "../model/Task";
import { Doc } from "../utility/TsTypes";
import MongoQueryHelper from "./query/MongoQueryHelper";

const findAll = async (
  pageIndex: number,
  pageSize: number,
  sort?: Record<string, 1 | -1>
) => {
  const match = {
    $or: [
      { status: { $ne: "DONE" } },
      { resolvedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
    ],
  };
  return Task.m
    .aggregate()
    .match(match)
    .facet({
      page: [{ $count: "count" }],
      tasks: [
        { $skip: (pageIndex - 1) * pageSize },
        { $limit: pageSize },
        { $sort: sort ?? { resolvedAt: -1, priority: 1 } },
        MongoQueryHelper.lookUpEnclosures,
        MongoQueryHelper.lookUpAnimals,
        {
          $lookup: {
            from: "apiUsers",
            localField: "assignTo",
            foreignField: "_id",
            as: "assignTo",
          },
        },
        {
          $lookup: {
            from: "apiUsers",
            localField: "createdBy",
            foreignField: "_id",
            as: "createdBy",
          },
        },
      ],
    });
};

const saveTask = async (task: Doc<TypeTask>) => {
  return task.save();
};

export default { findAll, saveTask };
