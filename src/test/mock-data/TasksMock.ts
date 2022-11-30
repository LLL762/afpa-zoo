import Task, { TypeTask } from "../../model/Task";
import { Doc } from "../../utility/TsTypes";
import { IMockDataUtil } from "./IMockDataUtil";

const data = [
  {
    _id: "507f1f77bcf86cd799439011",
    name: "feed Drako",
    description: "feed Drako ASAP",
    type: "ANIMAL_FEED",
    priority: 100,
    status: "TO_DO",
    createdBy: "637deb9f673cbfb479201d23",
    assignTo: ["637deb9f673cbfb479201d23", "637deb9f673cbfb479201d24"],
    animals: ["507f1f77bcf86cd799439011"],
  },
  {
    _id: "507f1f77bcf86cd799439012",
    name: "feed Drako",
    description: "feed Drako ASAP",
    type: "ANIMAL_FEED",
    priority: 100,
    status: "DONE",
    createdBy: "637deb9f673cbfb479201d23",
    assignTo: ["637deb9f673cbfb479201d23", "637deb9f673cbfb479201d24"],
    animals: ["507f1f77bcf86cd799439011"],
    resolvedAt: "2022-01-22T14:56:59.301Z",
  },
  {
    _id: "507f1f77bcf86cd799439013",
    name: "stimulate kangooros",
    description: "stimulate kangooros",
    type: "ENCLOSURE_STIMULATE",
    priority: 25,
    status: "TO_DO",
    createdBy: "637deb9f673cbfb479201d24",
    assignTo: ["637deb9f673cbfb479201d23"],
    enclosures: ["507f1f77bcf86cd799439011"],
  },
] as const;

const createData = () => JSON.parse(JSON.stringify(data)) as typeof data;
const createOne = (index: number) =>
  JSON.parse(JSON.stringify(data[index])) as Doc<TypeTask>;

const util: IMockDataUtil = {
  insert: async function () {
    await Task.m.insertMany(data);
  },
  clean: async function () {
    await Task.m.deleteMany({}).exec();
  },
} as const;

export default { createData, createOne, util };
