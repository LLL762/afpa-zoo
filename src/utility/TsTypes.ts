import { Document, Types } from "mongoose";

export type Doc<T> = Document<unknown, any, T> &
  T & {
    _id: Types.ObjectId;
  };
