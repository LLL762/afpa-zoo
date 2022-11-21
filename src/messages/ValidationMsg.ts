const maxLength = (key: string, max: number) =>
  key + ` : must have less than ${max} characters`;

const minLength = (key: string, min: number) =>
  key + ` : must have at least ${min} characters`;

const required = (key: string) => key + " is required";

const noFuture = (key: string) => key + " cannot be in the future";

const validationSchema = (key: string) => key + "must be a valid json schema";

const betweenLength = (key: string, min: number, max: number) =>
  `${key} must be between ${min} and ${max}`;

const pageParam = (key: string) =>
  `Query parameter ${key} must be an integer greater or equal to 1`;

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
  err,
};
