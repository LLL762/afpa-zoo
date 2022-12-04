import { Types } from "mongoose";
import UriConfigs from "../configs/UriConfigs";
import { IJwtPayload } from "../jwt/JwtUtil";
import Task, { TypeTask } from "../model/Task";
import TaskRepo from "../repo/TaskRepo";
import AuthorizationUtil from "../security/AuthorizationUtil";
import PaginationUtility from "../utility/PaginationUtility";
import { Doc } from "../utility/TsTypes";

const props = Task.properties;
const URIS = UriConfigs.URIS;

const findAll = async (pageIndex: number, pageSize: number, user: IJwtPayload) => {
  const pIndex = isNaN(pageIndex) ? 1 : pageIndex;
  const pSize = PaginationUtility.checkPageSize(
    pageSize,
    props.page.size,
    props.page.maxSize
  );
  let match;

  if (!AuthorizationUtil.hasRole("ADMIN", user, true)) {
    match = { $or: [{ assignTo: new Types.ObjectId(user.id) }, { createdBy: new Types.ObjectId(user.id) }] };
  }

  const queryResult = await TaskRepo.findAll(pIndex, pSize, match);
  const tasks = queryResult[0].tasks;

  const nbTasks = queryResult[0].page[0]?.count ?? 0;

  const nbPages = PaginationUtility.getMaxPage(nbTasks, pSize);

  for (let enclosure of tasks) {
    enclosure.url = UriConfigs.getResourceUrl(enclosure, "animals");
  }

  return {
    tasks: tasks,
    nbRetreived: tasks.length,
    pageIndex: pIndex,
    pageSize: pSize,
    nbPages: nbPages,
  };
};

const findById = async (id: string) => {
  return TaskRepo.findById(id);
};

const createTask = async (newTask: Doc<TypeTask>) => {
  return TaskRepo.save(newTask);
};

const editTask = async (task: Doc<TypeTask>) => {
  return TaskRepo.editTask(task);
};

const addAssignTo = async (task: Doc<TypeTask>) => {
  return TaskRepo.addAssignTo(task);
};

const removeAssignTo = async (taskId: string, userId: string) => {
  return TaskRepo.removeAssignTo(taskId, userId);
};

const addAnimals = async (task: Doc<TypeTask>) => {
  return TaskRepo.addAnimals(task);
};

const removeAnimal = async (taskId: string, animalId: string) => {
  return TaskRepo.removeAnimal(taskId, animalId);
};

const addEnclosures = async (task: Doc<TypeTask>) => {
  return TaskRepo.addEnclosures(task);
};

const removeEnclosure = async (taskId: string, enclosureId: string) => {
  return TaskRepo.removeEnclosure(taskId, enclosureId);
};

export default {
  findAll,
  findById,
  createTask,
  editTask,
  addAssignTo,
  removeAssignTo,
  removeAnimal,
  addAnimals,
  addEnclosures,
  removeEnclosure,
};
