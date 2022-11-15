import EnclosureType from "../../model/EnclosureType";

const data = [
  {
    _id: 1,
    name: "Vivarium",
    description: "Vivarium",

    validationSchema: {
      type: "object",
      properties: {
        temperatureInCelsius: {
          type: "number",
          minimum: -100,
          maximum: 100,
        },
        hygrometry: {
          type: "number",
        },
      },
      required: ["temperatureInCelsius", "hygrometry"],
      additionalProperties: false,
    },
  },
  {
    _id: 2,
    name: "Pool",
    description: "Pool",

    validationSchema: {
      type: "object",
      properties: {
        temperatureMinInCelsius: {
          type: "number",
          minimum: -100,
          maximum: 100,
        },
        temperatureMaxInCelsius: {
          type: "number",
          minimum: -100,
          maximum: 100,
        },
      },
      required: ["temperatureMinInCelsius", "temperatureMaxInCelsius"],
      additionalProperties: false,
    },
  },
];

const insert = async () => {
  EnclosureType.m.insertMany(data);
};
const clean = async () => {
  EnclosureType.m.collection.drop();
};

export default { insert, clean };
