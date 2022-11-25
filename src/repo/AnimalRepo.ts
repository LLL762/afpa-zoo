import Animal from "../model/Animal";

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
        { $project: { description: 0, additionalData: 0 } },
        {
          $lookup: {
            from: "enclosure",
            localField: "enclosure",
            foreignField: "_id",
            as: "enclosure",
            pipeline: [{ $project: { name: 1, _id: 1 } }],
          },
        },
        { $unwind: { path: "$enclosure", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "zones",
            localField: "enclosure.zone",
            foreignField: "_id",
            as: "enclosure.zone",
            pipeline: [{ $project: { name: 1, _id: 1 } }],
          },
        },
        {
          $unwind: {
            path: "$enclosure.zone",
            preserveNullAndEmptyArrays: true,
          },
        },
      ],
    });
};

export default { findAll };
