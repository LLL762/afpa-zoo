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

const lookUpAnimals = {
  $lookup: {
    from: "animals",
    localField: "animals",
    foreignField: "_id",
    as: "animals",
    pipeline: [
      {
        $lookup: {
          from: "enclosure",
          localField: "enclosures",
          foreignField: "_id",
          as: "enclosure",
          pipeline: [{ $project: { name: 1, _id: 1 } }],
        },
      },
      { $project: { name: 1, _id: 1 } },
      { $unwind: { path: "$enclosure", preserveNullAndEmptyArrays: true } },
    ],
  },
};

const lookUpApiUserFn = (localField: string) => {
  return {
    $lookup: {
      from: "apiUsers",
      localField: localField,
      foreignField: "_id",
      as: localField,
      pipeline: [
        {
          $project: {
            lastname: 1,
            firstname: 1,
            _id: 1,
            job: { name: "$job.name" },
          },
        },
      ],
    },
  };
};

export default {
  lookUpEnclosure,
  lookUpEnclosures,
  lookUpAnimals,
  lookUpApiUserFn,
};
