import { InferSchemaType, Schema } from "mongoose";
import ValidationMsg from "../messages/ValidationMsg";

const properties = {
  accessLevel: {
    min: 0,
    max: 100,
  },
  name: {
    TRASH: 0,
    STAFF: 10,
    ADMIN: 20,
    GOD: 1000,
  },
} as const;

const schema = new Schema(
  {
    accessLevel: {
      type: Number,
      required: [true, ValidationMsg.required("accessLevel")],
      min: [
        properties.accessLevel.min,
        ValidationMsg.min("accessLevel", properties.accessLevel.min),
      ],
      max: [
        properties.accessLevel.max,
        ValidationMsg.max("accessLevel", properties.accessLevel.max),
      ],
      default: 0
    },
    name: {
      type: String,
      enum: {
        values: Object.keys(properties.name),
        message: ValidationMsg.enumValue("name", Object.keys(properties.name)),
      },
    },
  },
  { _id: false, timestamps: true }
);

export type TypeRole = InferSchemaType<typeof schema>;

export default {
  properties,
  schema,
};
