import { CustomError } from "./CustomError";

export interface UniqueKeyErrConflict {
  key: string;
  value: string | number;
  url?: string;
}

export class UniqueKeyError extends CustomError {
  public conflicts?: UniqueKeyErrConflict[];

  constructor(msg?: string, json?: Object, conflicts?: UniqueKeyErrConflict[]) {
    super(msg, 422, json);
    this.name = "UniqueKeyError";
    this.conflicts = conflicts;
  }
}
