import Animal from "../model/Animal";
import MongoQueryHelper from "./query/MongoQueryHelper";

const findAll = async (
  pageIndex: number,
  pageSize: number,
  sort?: Record<string, 1 | -1>
) => {
  return Animal.m
    .aggregate()
    .match({})
    .facet({
      page: [{ $count: "count" }],
      animals: [
        { $skip: (pageIndex - 1) * pageSize },
        { $limit: pageSize },
        { $sort: sort ?? { name: 1 } },
        { $project: { observations: 0 } },
        MongoQueryHelper.lookUpEnclosure,
        { $unwind: { path: "$enclosure", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "species",
            localField: "specy",
            foreignField: "_id",
            as: "specy",
            pipeline: [{ $project: { name: 1, _id: 1 } }],
          },
        },
        { $unwind: { path: "$specy", preserveNullAndEmptyArrays: true } },
      ],
    });
};

const findById = async (id: string) =>
  Animal.m
    .findById(id)
    .populate("specy", "_id name")
    .populate({
      path: "enclosure",
      populate: { path: "zone", select: { name: 1, _id: 1 } },
      select: { name: 1, _id: 1, zone: 1, gpsCoordinates: 1 },
    })
    .orFail()
    .exec();

const getObservations = async (
  pageIndex: number,
  pageSize: number,
  sort?: Record<string, 1 | -1>
) => {
  return Animal.m.aggregate();
};

export default { findAll, findById };
