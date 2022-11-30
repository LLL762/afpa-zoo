import { Error, InferSchemaType, model, Schema, Types } from "mongoose";
import Msg from "../messages/ValidationMsg";
import TaskValidator from "../validation/TaskValidator";
import TaskHook from "./model-hooks/TaskHook";

const properties = {
  name: {
    minLength: 5,
    maxLength: 20,
  },
  description: {
    minLength: 5,
    maxLength: 1024,
  },
  priority: {
    min: 0,
    max: 100,
  },
  status: {
    values: ["DONE", "TO_DO"],
  },
  type: {
    values: [
      "ANIMAL_FEED",
      "ANIMAL_STIMULATE",
      "ANIMAL_CLEAN",
      "ANIMAL_IN",
      "ANIMAL_OUT",
      "ENCLOSURE_CLEAN",
      "ENCLOSURE_FEED",
      "ENCLOSURE_STIMULATE",
      "ENCLOSURE_OUT",
      "ENCLOSURE_IN",
    ],
  },
  page: {
    size: 15,
    maxSize: 20,
  },
} as const;

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, Msg.required("name")],
      trim: true,
      maxlength: [
        properties.name.maxLength,
        Msg.maxLength("name", properties.name.maxLength),
      ],
      minlength: [
        properties.name.minLength,
        Msg.minLength("name", properties.name.minLength),
      ],
    },
    description: {
      type: String,
      maxlength: [
        properties.name.maxLength,
        Msg.maxLength("description", properties.description.maxLength),
      ],
      minlength: [
        properties.name.minLength,
        Msg.minLength("description", properties.description.minLength),
      ],
    },
    type: {
      type: String,
      enum: {
        values: properties.type.values,
        message: Msg.enumValue("type", properties.type.values),
      },
    },
    resolvedAt: { type: Date },
    status: {
      type: String,
      required: [true, Msg.required("status")],
      enum: {
        values: properties.status.values,
        message: Msg.enumValue("status", properties.status.values),
      },
      default: "TO_DO",
    },
    priority: {
      type: Number,
      max: [
        properties.priority.max,
        Msg.max("priority", properties.priority.max),
      ],
      min: [
        properties.priority.min,
        Msg.min("priority", properties.priority.min),
      ],
    },
    createdBy: {
      type: Types.ObjectId,
      required: [true, Msg.required("createdBy")],
      ref: "ApiUser",
    },
    assignTo: [{ type: Types.ObjectId, ref: "ApiUser" }],
    animals: [{ type: Types.ObjectId, ref: "Animal" }],
    enclosures: [{ type: Types.ObjectId, ref: "Enclosure" }],
  },
  { collection: "tasks", timestamps: true }
);

schema.post("validate", (doc, next) => {
  if (!TaskValidator.validateTypeResource(doc)) {
    return next(new Error.ValidationError());
  }
  return next();
});

schema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate() as any;
    const filter = this.getFilter() as any;

    await TaskHook.onAddAssignTo(update);
    await TaskHook.onAddAnimals(update);
    await TaskHook.onAddEnclosure(update);
    TaskHook.onDonePre(update);
    console.log(update);

    return next();
  } catch (error) {
    return next(error as Error);
  }
});

schema.post("findOneAndUpdate", (doc, next) => {
  if (doc.isModified("status") && doc.status == "DONE") {
    TaskHook.onDonePost(doc);
  }
  return next();
});

export type TypeTask = InferSchemaType<typeof schema>;

const m = model("Task", schema);

export default { properties, m };
