import Enclosure from "../../model/Enclosure";

const data = [
  {
    _id: 1,
    name: "Kangooro desert",
    description: "A lot of jumping",
    areaInSquareMeter: 1000,
    gpsCoordinates: [45, 45],
    zone: 1,
  },
  {
    _id: 2,
    name: "Koalas forest",
    description: "Very dangerous place",
    areaInSquareMeter: 1000,
    gpsCoordinates: [45, 45],
    zone: 1,
  },
  {
    _id: 3,
    name: "Turtle beach",
    description: "A beach full of sand and turtles",
    areaInSquareMeter: 1000,
    gpsCoordinates: [45, 45],
    type: 1,
    typeData: {
      temperatureMinInCelsius: 27,
      temperatureMaxInCelsius: 35,
    },
    additionalData: {
      observation: "slow down",
    },
    zone: 1,
  },
  {
    _id: 4,
    name: "Panda forest",
    description: "panda",
    gpsCoordinates: [45, 45],
    areaInSquareMeter: 1000,
    zone: 2,
  },
  {
    _id: 5,
    name: "Rhino swamp",
    description: "Rhino swamp",
    areaInSquareMeter: 1000,
    gpsCoordinates: [45, 45],
    zone: 2,
  },
];

const insert = async () => {
  Enclosure.m.insertMany(data);
};

const clean = async () => {
  Enclosure.m.collection.drop();
};

export default { insert, clean };
