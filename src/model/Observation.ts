import { Schema, Types } from "mongoose";
import Msg from "../messages/ValidationMsg";
import ApiUser from "./ApiUser";

const properties = {
  content: {
    minLength: 3,
    maxLength: 50,
  },
} as const;

const schema = new Schema(
  {
    content: {
      type: String,
      required: [true, Msg.required("content")],
      minLength: [
        properties.content.minLength,
        Msg.minLength("content", properties.content.minLength),
      ],
      maxLength: [
        properties.content.maxLength,
        Msg.maxLength("content", properties.content.maxLength),
      ],
    },
    author: {
      type: Types.ObjectId,
      ref: "ApiUser",
      required: [true, Msg.required("author")],
    },
  },
  { timestamps: true }
);

export default { properties, schema };
