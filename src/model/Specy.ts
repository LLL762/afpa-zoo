import { Schema, Types } from "mongoose";
import ValidationMsg from "../messages/ValidationMsg";
import Observation from "./Observation";

const properties = {
  name: {
    maxLength: 255,
    minLength: 1,
  },
  description: {
    maxLength: 5000,
    minLength: 5,
  },
  observations: {
    maxLength: 500,
  },
  page: {
    size: 25,
    maxSize: 50,
  },
} as const;

const schema = new Schema({
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
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [
      properties.description.maxLength,
      ValidationMsg.maxLength("description", properties.description.maxLength),
    ],
    minlength: [
      properties.description.minLength,
      ValidationMsg.minLength("description", properties.description.minLength),
    ],
  },
  observations: {
    type: [{ type: Observation.schema }],
    validate: [
      (value: any[]) => value.length <= properties.observations.maxLength,
    ],
  },
});
