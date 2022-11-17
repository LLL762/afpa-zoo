export class CustomError extends Error {
  public readonly httpStatus?: number;
  public readonly details?: Object;

  constructor(msg?: string, httpStatus?: number, json?: Object) {
    super(msg);
    this.name = "CustomError";
    this.httpStatus = httpStatus;
    this.details = json;
  }
}
