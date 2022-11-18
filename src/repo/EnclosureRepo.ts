import { Types } from "mongoose";
import Enclosure from "../model/Enclosure";

const projectionMin = { name: 1, _id: 1, gpsCoordinates: 1 };

const findByZoneId = async (
  zoneId: string,
  pageIndex: number,
  pageSize: number
) => {
  return Enclosure.m
    .aggregate()
    .match({ zone: new Types.ObjectId(zoneId) })
    .facet({
      page: [{ $count: "count" }],
      enclosures: [
        { $skip: (pageIndex - 1) * pageSize },
        { $limit: pageSize },
        { $sort: { name: 1 } },
        { $project: projectionMin },
      ],
    });
};

export default { findByZoneId };
