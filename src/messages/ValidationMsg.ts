const maxLength = (key: string, max: number) =>
  key + ` : must have less than ${max} characters`;

const minLength = (key: string, min: number) =>
  key + ` : must have at least ${min} characters`;

const required = (key: string) => key + " is required";

const noFuture = (key: string) => key + " cannot be in the future";

const validationSchema = (key: string) => key + "must be a valid json schema";

export default { maxLength, minLength, required, noFuture, validationSchema };
