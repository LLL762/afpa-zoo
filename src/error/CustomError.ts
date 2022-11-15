export class CustomError extends Error {
  public readonly details?: Object;

  constructor(msg?: string, json?: Object) {
    super(msg);
    this.name = "CustomError";
    this.details = json;
  }
}
