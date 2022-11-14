import { Types } from "mongoose";

interface ISpecy {
  _id: Types.ObjectId;
  name: string;
  subspecies: ISpecy[];
  endangered: boolean;
}
