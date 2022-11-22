import { Schema, Types } from "mongoose";
import Msg from "../messages/ValidationMsg";

const properties = {
  name: {
    minLength: 3,
    maxLength: 50,
  },
  description: {
    minLength: 10,
    maxLength: 1522,
  },
} as const;

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, Msg.required("name")],
      minLength: [
        properties.name.minLength,
        Msg.minLength("name", properties.name.minLength),
      ],
      maxLength: [
        properties.name.maxLength,
        Msg.maxLength("name", properties.name.maxLength),
      ],
    },
    description: {
      required: [true, Msg.required("description")],
      minLength: [
        properties.description.minLength,
        Msg.minLength("description", properties.description.minLength),
      ],
      maxLength: [
        properties.description.maxLength,
        Msg.maxLength("description", properties.description.maxLength),
      ],
    },
    zones: [{ type: Types.ObjectId, ref: "Zone" }],
    enclosures: [{ type: Types.ObjectId, ref: "Enclosure" }],
    animals: [{ type: Types.ObjectId, ref: "Animals" }],
    species: [{ type: Types.ObjectId, ref: "Specy" }],
  },
  { _id: false, timestamps: true }
);

export default { properties, schema };
