import Enclosure from "../../model/Enclosure";

const data = [
  {
    _id: 1,
    name: "Kangooro desert",
    description: "A lot of jumping",
    areaInSquareMeter: 1000,
    GpsCoordinates: [45, 45],
  },
  {
    _id: 2,
    name: "Koalas forest",
    description: "Very dangerous place",
    areaInSquareMeter: 1000,
    GpsCoordinates: [45, 45],
  },
  {
    _id: 3,
    name: "Turtle beach",
    description: "A beach full of sand and turtles",
    areaInSquareMeter: 1000,
    GpsCoordinates: [45, 45],
    additionalData: {
      temperatureMinInCelsius: 27,
      temperatureMaxInCelsius: 35,
    },
  },
];

const insert = async () => {
  Enclosure.m.create({
    _id: 3,
    name: "Turtle beach",
    description: "A beach full of sand and turtles",
    areaInSquareMeter: 1000,
    GpsCoordinates: [45, 45],
    additionalData: {
      temperatureMinInCelsius: 27,
      temperatureMaxInCelsius: 35,
    },
  });
};

export default { insert };
