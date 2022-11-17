import { InferSchemaType, model, Schema, SchemaTypes } from "mongoose";
import UriConfigs from "../configs/UriConfigs";
import ValidationMsg from "../messages/ValidationMsg";

const properties = {
  url: UriConfigs.URIS.base + UriConfigs.URIS.zones,
  name: {
    maxLength: 255,
    minLength: 1,
  },
  description: {
    maxLength: 5000,
    minLength: 5,
  },
  page: {
    size: 20,
    maxSize: 50,
  },
  search: {
    min: 2,
    maxResult: 10,
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
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [
        properties.description.maxLength,
        ValidationMsg.maxLength(
          "description",
          properties.description.maxLength
        ),
      ],
      minlength: [
        properties.description.minLength,
        ValidationMsg.minLength(
          "description",
          properties.description.minLength
        ),
      ],
    },
  },
  { collection: "zones", timestamps: true }
);

export type TypeZone = InferSchemaType<typeof schema>;

const m = model("Zone", schema);

export default { properties, m };
