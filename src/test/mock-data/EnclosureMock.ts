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
  {
    _id: "507f1f77bcf86cd799439016",
    name: "Vultures nest",
    description: "Vulture nest",
    areaInSquareMeter: 1000,
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    zone: "507f1f77bcf86cd799439013",
  }, {
    _id: "507f1f77bcf86cd799439017",
    name: "Camels dunes",
    description: "Camel dunes",
    areaInSquareMeter: 1000,
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    zone: "507f1f77bcf86cd799439013",
  },
  {
    _id: "507f1f77bcf86cd799439018",
    name: "Wolfs hunting ground",
    description: "Wolf hunting ground",
    areaInSquareMeter: 1000,
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    zone: "507f1f77bcf86cd799439014",
  },
  {
    _id: "507f1f77bcf86cd799439019",
    name: "Bears caves",
    description: "Bear caves",
    areaInSquareMeter: 1000,
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    zone: "507f1f77bcf86cd799439014",
  },
  {
    _id: "507f1f77bcf86cd799439020",
    name: "Marmots field",
    description: "Marmot field",
    areaInSquareMeter: 1000,
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    zone: "507f1f77bcf86cd799439016",
  },
  {
    _id: "507f1f77bcf86cd799439021",
    name: "Chamois mountainside",
    description: "Chamois mountainside",
    areaInSquareMeter: 1000,
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    zone: "507f1f77bcf86cd799439016",
  },
  {
    _id: "507f1f77bcf86cd799439022",
    name: "Hyenas Den",
    description: "Hyenas Den",
    areaInSquareMeter: 1000,
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    zone: "507f1f77bcf86cd799439015",
  },
  {
    _id: "507f1f77bcf86cd799439023",
    name: "Lion kingdom",
    description: "Lion kingdom",
    areaInSquareMeter: 1000,
    gpsCoordinates: { type: "Point", coordinates: [45, 45] },
    zone: "507f1f77bcf86cd799439015",
  }
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
