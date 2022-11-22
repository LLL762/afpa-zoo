import { InferSchemaType, Schema } from "mongoose";
import ValidationMsg from "../messages/ValidationMsg";

const properties = {
  nameEnum: ["GOD", "ADMIN", "STAFF", "TRASH"],
  accessLevel: {
    min: 0,
    max: 100,
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
    },
    name: {
      type: String,
      enum: {
        values: properties.nameEnum,
        message: ValidationMsg.enumValue("name", properties.nameEnum),
      },
      unique: true,
    },
  },
  { _id: false, timestamps: true }
);

export type TypeRole = InferSchemaType<typeof schema>;

export default {
  properties,
  schema,
};
