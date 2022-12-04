import { InferSchemaType, model, Schema, Types } from "mongoose";
import ValidationMsg from "../messages/ValidationMsg";
import Observation from "./Observation";

const properties = {
  name: {
    maxLength: 255,
    minLength: 1,
  },
  observations: {
    maxLength: 5,
  },
  page: {
    size: 50,
    maxSize: 100,
  },
  sexe: {
    values: ["M", "F", "undefined", "hermaphrodite"]
  }
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
    observations: {
      type: [Observation.schema],
      validate: [
        (value: any[]) => value.length <= properties.observations.maxLength,
      ],
    },
    sexe: {
      type: String,
      enum: properties.sexe.values,
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
    specy: { type: Types.ObjectId, ref: "Specy" },
  },
  { collection: "animals", timestamps: true }
);

export type TypeAnimal = InferSchemaType<typeof schema>;

const m = model("Animal", schema);

export default { properties, m };
