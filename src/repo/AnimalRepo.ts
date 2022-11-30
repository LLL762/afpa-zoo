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

const findByIdIn = async (ids: string[], projection?: Object) => {
  const project = projection ?? { _id: 1 };
  return Animal.m.find({ id: { $in: ids } }, project).exec();
};

const findByEnclosure = async (enclosureId: string) => {
  return Animal.m
    .find({ enclosure: enclosureId })
    .populate("specy", "_id name")
    .exec();
};

const feedAnimalsByEnclosure = async (enclosureIds: string[]) => {
  return Animal.m.updateMany(
    { enclosure: { $in: enclosureIds } },
    { $set: { feed: true } }
  );
};

const feedAnimals = async (animalsId: string[]) => {
  return Animal.m.updateMany(
    { _id: { $in: animalsId } },
    { $set: { feed: true } }
  );
};

const stimulateAnimalsByEnclosure = async (enclosureIds: string[]) => {
  return Animal.m.updateMany(
    { enclosure: { $in: enclosureIds } },
    { $set: { stimulated: true } }
  );
};

const stimulateAnimals = async (animalsId: string[]) => {
  return Animal.m.updateMany(
    { _id: { $in: animalsId } },
    { $set: { stimulated: true } }
  );
};

const outAnimalsByEnclosure = async (enclosureIds: string[]) => {
  return Animal.m.updateMany(
    { enclosure: { $in: enclosureIds } },
    { $set: { out: true } }
  );
};

const outAnimals = async (animalsId: string[]) => {
  return Animal.m.updateMany(
    { _id: { $in: animalsId } },
    { $set: { out: true } }
  );
};

const inAnimalsByEnclosure = async (enclosureIds: string[]) => {
  return Animal.m.updateMany(
    { enclosure: { $in: enclosureIds } },
    { $set: { out: false } }
  );
};

const inAnimals = async (animalsId: string[]) => {
  return Animal.m.updateMany(
    { _id: { $in: animalsId } },
    { $set: { out: false } }
  );
};

const getObservations = async (
  pageIndex: number,
  pageSize: number,
  sort?: Record<string, 1 | -1>
) => {
  return Animal.m.aggregate();
};

export default {
  findAll,
  findById,
  findByIdIn,
  findByEnclosure,
  feedAnimals,
  feedAnimalsByEnclosure,
  stimulateAnimals,
  stimulateAnimalsByEnclosure,
  outAnimals,
  outAnimalsByEnclosure,
  inAnimals,
  inAnimalsByEnclosure,
};
