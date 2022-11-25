import Animal from "../../model/Animal";
import { IMockDataUtil } from "./IMockDataUtil";

const data = [
  {
    _id: "507f1f77bcf86cd799439011",
    name: "Drako",
    birthDate: "2018-12-10T13:49:51.141Z",
    managedSince: "2020-12-10T13:49:51.141Z",
    sexe: "M",
    out: false,
    fed: true,
    stimulated: true,
    observations: "Annoying",
    enclosure: "507f1f77bcf86cd799439011",
  },
] as const;

const util: IMockDataUtil = {
  insert: async function () {
    await Animal.m.insertMany(data);
  },
  clean: async function () {
    await Animal.m.deleteMany({}).exec();
  },
} as const;

export default { util, data };
