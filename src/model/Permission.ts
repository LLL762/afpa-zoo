import { InferSchemaType, Schema, Types } from "mongoose";
import Msg from "../messages/ValidationMsg";

const properties = {
  type: {
    values: ["READ, WRITE"],
  },
  level: {
    public: 0,
    private: 1,
  },
  resource: {
    values: ["ALL", "ZONE", "ENCLOSURE", "ANIMAL", "SPECIE"],
  },
  scope: {
    values: ["ALL", "RESOURCE"],
  },
} as const;

const schema = new Schema(
  {
    type: {
      type: String,
      required: [true, Msg.required("type")],
      enum: {
        values: properties.type.values,
        message: Msg.enumValue("type", properties.type.values),
      },
    },
    level: {
      type: String,
      required: [true, Msg.required("level")],
      enum: {
        values: Object.values(properties.level),
        message: Msg.enumValue("level", Object.keys(properties.level)),
      },
    },
    resource: {
      type: String,
      required: [true, Msg.required("resource")],
      enum: {
        values: properties.resource.values,
        message: Msg.enumValue("resource", properties.resource.values),
      },
    },
    scope: {
      type: String,
      required: [true, Msg.required("scope")],
      enum: {
        values: properties.scope.values,
        message: Msg.enumValue("scope", properties.scope.values),
      },
    },
    resources: [{ type: Types.ObjectId }],
    expiredAt: {
      type: Date,
      min: [Date.now(), Msg.noPast("expiredAt")],
    },
  },
  { timestamps: true }
);

export type TypePermission = InferSchemaType<typeof schema>;

export default {
  properties,
  schema,
};
