export class ValidationError extends Error {
  public readonly details?: Object;

  constructor(msg?: string, json?: Object) {
    super(msg);
    this.name = "ValidationError";
    this.details = json;
  }
}
