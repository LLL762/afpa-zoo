import { InferSchemaType, model, Schema, Types } from "mongoose";
import ValidationMsg from "../messages/ValidationMsg";

const properties = {
  name: {
    maxLength: 255,
    minLength: 1,
  },
  observations: {
    maxLength: 5000,
    minLength: 5,
  },
} as const;

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, ValidationMsg.required("name")],
      trim: true,
      maxlength: [
        properties.name.maxLength,
        ValidationMsg.maxLength("name", properties.name.maxLength),
      ],
      minlength: [
        properties.name.minLength,
        ValidationMsg.minLength("name", properties.name.minLength),
      ],
    },
    fed: Boolean,
    out: Boolean,
    stimulated: Boolean,
    obervations: {
      type: String,
      trim: true,
      maxlength: [
        properties.observations.maxLength,
        ValidationMsg.maxLength(
          "observations",
          properties.observations.maxLength
        ),
      ],
      minlength: [
        properties.observations.minLength,
        ValidationMsg.minLength(
          "observations",
          properties.observations.minLength
        ),
      ],
    },
    sexe: {
      type: String,
      enum: ["M", "F", "undefined", "hermaphrodite"],
      default: "undefined",
      required: true,
    },
    birthDate: {
      type: Date,
      max: [Date.now(), ValidationMsg.noFuture("birthDate")],
    },
    managedSince: {
      type: Date,
      max: [Date.now(), ValidationMsg.noFuture("managedSince")],
    },
    enclosure: { type: Types.ObjectId, ref: "Enclosure" },
    imgUrl: {
      type: String,
    },
  },
  { collection: "animals", timestamps: true }
);

export type Animal = InferSchemaType<typeof schema>;

const m = model("Animal", schema);

export default { properties, m };
