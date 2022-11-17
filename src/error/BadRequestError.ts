import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
  constructor(msg?: string, json?: Object) {
    super(msg, 400, json);
    this.name = "BadRequestError";
  }
}
