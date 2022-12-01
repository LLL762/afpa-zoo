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
        { $sort: sort ?? { resolvedAt: -1, priority: -1 } },
        MongoQueryHelper.lookUpEnclosures,
        MongoQueryHelper.lookUpAnimals,
        MongoQueryHelper.lookUpApiUserFn("createdBy"),
        MongoQueryHelper.lookUpApiUserFn("assignTo"),
      ],
    });
};

const findById = (id: string) => {
  return Task.m
    .findById(id)
    .populate("createdBy", "firstname lastname job.name _id")
    .populate("assignTo", "firstname lastname job.name _id")
    .populate("animals", "name _id")
    .populate("enclosures", "name _id")
    .orFail()
    .exec();
};

const save = async (task: Doc<TypeTask>) => {
  return task.save();
};

const editTask = async (task: Doc<TypeTask>) => {
  return Task.m
    .findByIdAndUpdate(
      task._id,
      {
        name: task.name,
        description: task.description,
        priority: task.priority,
        status: task.status,
      },
      {
        returnOriginal: false,
      }
    )
    .orFail()
    .exec();
};

const addAssignTo = async (task: Doc<TypeTask>) => {
  return Task.m
    .findByIdAndUpdate(
      task._id,
      {
        $addToSet: { assignTo: { $each: task.assignTo } },
      },
      { returnOriginal: false }
    )
    .orFail()
    .exec();
};

const removeAssignTo = async (taskId: string, userId: string) => {
  return Task.m
    .findByIdAndUpdate(
      taskId,
      {
        $pull: { assignTo: userId },
      },
      { returnOriginal: false }
    )
    .orFail()
    .exec();
};

const addAnimals = async (task: Doc<TypeTask>) => {
  return Task.m
    .findByIdAndUpdate(
      task._id,
      {
        $addToSet: { animals: { $each: task.animals } },
      },
      { returnOriginal: false }
    )
    .orFail()
    .exec();
};

const removeAnimal = async (taskId: string, animalId: string) => {
  return Task.m
    .findByIdAndUpdate(
      taskId,
      {
        $pull: { animals: animalId },
      },
      { returnOriginal: false }
    )
    .orFail()
    .exec();
};

const addEnclosures = async (task: Doc<TypeTask>) => {
  return Task.m
    .findByIdAndUpdate(
      task._id,
      {
        $addToSet: { enclosures: { $each: task.enclosures } },
      },
      { returnOriginal: false }
    )
    .orFail()
    .exec();
};

const removeEnclosure = async (taskId: string, enclosureId: string) => {
  return Task.m
    .findByIdAndUpdate(
      taskId,
      {
        $pull: { enclosures: enclosureId },
      },
      { returnOriginal: false }
    )
    .orFail()
    .exec();
};

export default {
  findAll,
  findById,
  editTask,
  save,
  addAssignTo,
  removeAssignTo,
  addAnimals,
  removeAnimal,
  addEnclosures,
  removeEnclosure,
};
