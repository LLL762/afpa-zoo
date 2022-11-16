import Enclosure from "../../model/Enclosure";
import { IMockDataUtil } from "./IMockDataUtil";

const data = [
  {
    _id: "507f1f77bcf86cd799439011",
    name: "Kangooro desert",
    description: "A lot of jumping",
    areaInSquareMeter: 1000,
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    zone: "507f1f77bcf86cd799439011",
  },
  {
    _id: "507f1f77bcf86cd799439012",
    name: "Koalas forest",
    description: "Very dangerous place",
    areaInSquareMeter: 1000,
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    zone: "507f1f77bcf86cd799439011",
  },
  {
    _id: "507f1f77bcf86cd799439013",
    name: "Turtle beach",
    description: "A beach full of sand and turtles",
    areaInSquareMeter: 1000,
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    type: "507f1f77bcf86cd799439011",
    typeData: {
      temperatureMinInCelsius: 27,
      temperatureMaxInCelsius: 35,
    },
    additionalData: {
      observation: "slow down",
    },
    zone: "507f1f77bcf86cd799439011",
  },
  {
    _id: "507f1f77bcf86cd799439014",
    name: "Panda forest",
    description: "panda",
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    areaInSquareMeter: 1000,
    zone: "507f1f77bcf86cd799439012",
  },
  {
    _id: "507f1f77bcf86cd799439015",
    name: "Rhino swamp",
    description: "Rhino swamp",
    areaInSquareMeter: 1000,
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    zone: "507f1f77bcf86cd799439012",
  },
] as const;

const util: IMockDataUtil = {
  insert: async function () {
    await Enclosure.m.insertMany(data);
  },
  clean: async function () {
    await Enclosure.m.deleteMany({}).exec();
  },
} as const;

export default { data, util };
