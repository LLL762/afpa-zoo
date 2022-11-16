import Zone from "../../model/Zone";
import { IMockDataUtil } from "./IMockDataUtil";

const data = [
  {
    _id: "507f1f77bcf86cd799439011",
    name: "Australia",
    description: "Australia",
  },
  {
    _id: "507f1f77bcf86cd799439012",
    name: "Asia",
    description: "Asia Asia",
  },
  {
    _id: "507f1f77bcf86cd799439013",
    name: "Desert Africa",
    description: "Desert Africa",
  },
  {
    _id: "507f1f77bcf86cd799439014",
    name: "Forest North America",
    description: "Forest North America",
  },
  {
    _id: "507f1f77bcf86cd799439015",
    name: "Savannah Africa",
    description: "Savannah Africa",
  },
  {
    _id: "507f1f77bcf86cd799439016",
    name: "Mountain Europa",
    description: "Mountain Europa",
  },
] as const;

const util: IMockDataUtil = {
  insert: async function () {
    await Zone.m.insertMany(data);
  },
  clean: async function () {
    await Zone.m.deleteMany({}).exec();
  },
} as const;

export default { data, util };
