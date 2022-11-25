const maxLength = (key: string, max: number) =>
  key + ` : must have less than ${max} characters`;

const minLength = (key: string, min: number) =>
  key + ` : must have at least ${min} characters`;

const min = (key: string, min: number) =>
  key + ` : must be less than or equal to ${min}`;

const max = (key: string, max: number) =>
  key + ` : must be superior or equal to ${max}`;

const required = (key: string) => key + " is required";

const noFuture = (key: string) => key + " cannot be in the future";

const validationSchema = (key: string) => key + "must be a valid json schema";

const betweenLength = (key: string, min: number, max: number) =>
  `${key} must be between ${min} and ${max}`;

const pageParam = (key: string) =>
  `Query parameter ${key} must be an integer greater or equal to 1`;

const alreadyTaken = (key: string, value: string) =>
  key + " " + value + " is already taken";

const enumValue = (key: string, enumValues: readonly string[]) =>
  `${key} must be one of ${enumValues.join(", ")}`;

const maxSize = (key: string, max: number) =>
  `${key} must have less than ${max} elemennts `;

const weakPassword =
  "password : must contain at least 10 characters, 1 lowercase, 1 uppercase, 1 digits and 1 special";

const invalidEmail = "email : must be a valid email address";
const noPast = (key: string) => key + " cannot be in the past";

const err = {
  contentType: "Content type must be application/json",
} as const;

export default {
  maxLength,
  minLength,
  required,
  noFuture,
  validationSchema,
  betweenLength,
  pageParam,
  alreadyTaken,
  weakPassword,
  invalidEmail,
  min,
  max,
  enumValue,
  err,
  noPast,
  maxSize,
};
