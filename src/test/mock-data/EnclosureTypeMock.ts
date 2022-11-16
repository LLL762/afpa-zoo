import EnclosureType from "../../model/EnclosureType";
import { IMockDataUtil } from "./IMockDataUtil";

const data = [
  {
    _id: "507f1f77bcf86cd799439011",
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
    _id: "507f1f77bcf86cd799439012",
    name: "Pool",
    description: "Pool pull",

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
] as const;

const util: IMockDataUtil = {
  insert: async () => {
    await EnclosureType.m.insertMany(data);
  },
  clean: async () => {
    EnclosureType.m.collection.drop();
  },
} as const;

export default { data, util };
