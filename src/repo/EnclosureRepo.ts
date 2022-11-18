import { Types } from "mongoose";
import Enclosure from "../model/Enclosure";

const findByZoneId = async (
  zoneId: string,
  pageIndex: number,
  pageSize: number
) => {
  const skip = (pageIndex - 1) * pageSize;

  return Enclosure.m
    .aggregate()
    .match({ zone: new Types.ObjectId(zoneId) })
    .facet({
      page: [{ $count: "count" }],
      enclosures: [
        { $skip: skip },
        { $limit: pageSize },
        { $sort: { name: 1 } },
        { $project: { name: 1, _id: 1, gpsCoordinates: 1 } },
      ],
    });
};

/*   Enclosure.m
    .find({ zone: zoneId }, { _id: 1, name: 1, gpsCoordinates: 1 })
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .exec(); */

export default { findByZoneId };
