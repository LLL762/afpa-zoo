import { CustomError } from "./CustomError";

export class MissingAuthorizationError extends CustomError {
  constructor(msg?: string, json?: Object) {
    super(msg, 403, json);
    this.name = "MissingAuthorizationError";
  }
}
