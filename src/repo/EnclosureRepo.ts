import { Types } from "mongoose";
import Enclosure from "../model/Enclosure";

const projectionMin = { name: 1, _id: 1, gpsCoordinates: 1 };

const findAll = async (pageIndex: number, pageSize: number) =>
  Enclosure.m
    .aggregate()
    .match({})
    .facet({
      page: [{ $count: "count" }],
      enclosures: [
        { $skip: (pageIndex - 1) * pageSize },
        { $limit: pageSize },
        { $sort: { name: 1 } },
        { $project: { description: 0, additionalData: 0 } },
        {
          $lookup: {
            from: "zones",
            localField: "zone",
            foreignField: "_id",
            as: "zone",
            pipeline: [{ $project: { name: 1, _id: 1 } }]
          }
        },
        { $unwind: { path: '$zone' } },
        {
          $lookup: {
            from: "enclosuresTypes",
            localField: "type",
            foreignField: "_id",
            as: "type",
            pipeline: [{ $project: { name: 1, _id: 1 } }]
          }
        },
        { $unwind: { path: '$type', preserveNullAndEmptyArrays: true } }
      ],
    })




const findById = async (id: string) => Enclosure.m.findById(id)
  .populate("zone", "_id name")
  .populate("type", "_id name")
  .orFail().exec();

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
}

export default { findByZoneId, findAll, findById };
