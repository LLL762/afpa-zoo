import Specy from "../model/Specy";

const findAll = async (
  pageIndex: number,
  pageSize: number,
  sort?: Record<string, 1 | -1>
) => {
  return Specy.m
    .aggregate()
    .match({})
    .facet({
      page: [{ $count: "count" }],
      species: [
        { $skip: (pageIndex - 1) * pageSize },
        { $limit: pageSize },
        { $sort: sort ?? { name: 1 } },
        { $project: { description: 0, observations: 0 } },
        {
          $lookup: {
            from: "enclosures",
            localField: "enclosures",
            foreignField: "_id",
            as: "enclosures",
            pipeline: [
              {
                $lookup: {
                  from: "zones",
                  localField: "zone",
                  foreignField: "_id",
                  as: "zone",
                  pipeline: [{ $project: { name: 1, _id: 1 } }],
                },
              },
              { $project: { name: 1, _id: 1, gpsCoordinates: 1, zone: 1 } },
              { $unwind: { path: "$zone", preserveNullAndEmptyArrays: true } },
            ],
          },
        },
      ],
    });
};

export default { findAll };
