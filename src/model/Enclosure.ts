import { InferSchemaType, model, Schema, Types } from "mongoose";
import { CustomError } from "../error/CustomError";
import ValidationMsg from "../messages/ValidationMsg";
import EnclosureValidator from "../validation/EnclosureValidator";
import GeoLocSchema from "./GeoLocSchema";

const properties = {
  name: {
    maxLength: 255,
    minLength: 1,
  },
  description: {
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
    areaInSquareMeter: {
      type: Number,
    },
    gpsCoordinates: {
      type: GeoLocSchema.pointSchema,
    },
    type: { type: Types.ObjectId, ref: "EnclosureType" },
    typeData: { type: Object },
    zone: { type: Types.ObjectId, ref: "Zone" },
    additionalData: Object,
  },

  { collection: "enclosures", timestamps: true }
);

schema.pre("save", async function (next) {
  await EnclosureValidator.checkZone(this);
  await EnclosureValidator.checkTypeData(this);
  next();
});

export type Enclosure = InferSchemaType<typeof schema>;

const m = model("Enclosure", schema);

export default { properties, m };
