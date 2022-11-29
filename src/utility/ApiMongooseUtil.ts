import { Types } from "mongoose";

const toStringArray = (ids: Types.ObjectId[]) => {
  return ids.map((id) => id.toString());
};

export default { toStringArray };
