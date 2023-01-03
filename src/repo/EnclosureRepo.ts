import { Types } from "mongoose";
import Enclosure from "../model/Enclosure";

const projectionMin = { name: 1, _id: 1, gpsCoordinates: 1 };
const zoneLookUp = {
  from: "zones",
  localField: "zone",
  foreignField: "_id",
  as: "zone",
  pipeline: [{ $project: { name: 1, _id: 1 } }],
};
const typeLookUp = {
  from: "enclosuresTypes",
  localField: "type",
  foreignField: "_id",
  as: "type",
  pipeline: [{ $project: { name: 1, _id: 1 } }
  ]
};
const unwindZone = { path: "$zone", preserveNullAndEmptyArrays: true };
const unwindType = { path: "$type", preserveNullAndEmptyArrays: true };


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
          $lookup: zoneLookUp,
        },
        { $unwind: unwindZone },
        {
          $lookup: typeLookUp,
        },
        { $unwind: unwindType },
      ],
    });

const findById = async (id: string) => {
  return Enclosure.m.aggregate()
    .match({ _id: new Types.ObjectId(id) })
    .limit(1)
    .lookup(zoneLookUp)
    .lookup(typeLookUp)
    .unwind(unwindZone)
    .unwind(unwindType);
}



const findByIdIn = async (ids: string[], projection?: Object) => {
  const project = projection ?? { _id: 1 };
  return Enclosure.m.find({ _id: { $in: ids } }, project).exec();
};

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

export default { findByZoneId, findAll, findById, findByIdIn };
