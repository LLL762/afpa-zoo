import Zone from "../model/Zone";

const findAll = async (pageIndex: number, pageSize: number) =>
  Zone.m
    .find({}, { description: 0 })
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .exec();

const count = async () => Zone.m.countDocuments().exec();
const findById = async (id: string) => Zone.m.findById(id).orFail().exec();

export default { findAll, count, findById };
