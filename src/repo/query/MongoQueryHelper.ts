const lookUpEnclosure = {
  $lookup: {
    from: "enclosures",
    localField: "enclosure",
    foreignField: "_id",
    as: "enclosure",
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
};

const lookUpEnclosures = {
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
};

export default { lookUpEnclosure, lookUpEnclosures };
