import { InferSchemaType, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import ValidationMsg from "../messages/ValidationMsg";
import Job from "./Job";
import Permission from "./Permission";
import Role from "./Role";

const properties = {
  maxLength: 255,
  minLength: 2,

  username: {
    maxLength: 255,
    minLength: 5,
  },
  password: {
    saltLength: 10,
    details: {
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
  },
  firstname: {
    maxLength: 255,
    minLength: 2,
  },
  lastname: {
    maxLength: 255,
    minLength: 2,
  },
  permissions: {},
  page: {
    size: 30,
    maxSize: 100,
  },
} as const;

const schema = new Schema(
  {
    username: {
      type: String,
      required: [true, ValidationMsg.required("name")],
      trim: true,
      maxlength: [
        properties.username.maxLength,
        ValidationMsg.maxLength("username", properties.username.maxLength),
      ],
      minlength: [
        properties.username.minLength,
        ValidationMsg.minLength("username", properties.username.minLength),
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, ValidationMsg.required("password")],
      validate: [
        (value: string) =>
          validator.isStrongPassword(value, properties.password.details),
        ValidationMsg.weakPassword,
      ],
    },
    email: {
      type: String,
      required: [true, ValidationMsg.required("email")],
      trim: true,
      maxlength: [
        properties.maxLength,
        ValidationMsg.maxLength("email", properties.maxLength),
      ],
      validate: [
        (value: string) => validator.isEmail(value),
        ValidationMsg.invalidEmail,
      ],
      unique: true,
    },
    firstname: {
      type: String,
      required: [true, ValidationMsg.required("firstname")],
      trim: true,
      maxlength: [
        properties.maxLength,
        ValidationMsg.maxLength("firstname", properties.maxLength),
      ],
      minlength: [
        properties.minLength,
        ValidationMsg.minLength("firstname", properties.minLength),
      ],
    },
    lastname: {
      type: String,
      required: [true, ValidationMsg.required("lastname")],
      trim: true,
      maxlength: [
        properties.maxLength,
        ValidationMsg.maxLength("lastname", properties.maxLength),
      ],
      minlength: [
        properties.minLength,
        ValidationMsg.minLength("lastname", properties.minLength),
      ],
    },
    job: {
      type: Job.schema,
    },
    role: {
      type: Role.schema,
    },
    permissions: [
      {
        type: Permission.schema,
      },
    ],
  },

  { collection: "apiUsers", timestamps: true }
);

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(
        this.password,
        properties.password.saltLength
      );
    } catch (err: any) {
      console.log(err);
      next(err);
    }
  }
  next();
});

export type TypeApiUser = InferSchemaType<typeof schema>;
const m = model("ApiUser", schema);

export default { properties, m };
