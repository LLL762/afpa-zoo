import Zone, { TypeZone } from "../model/Zone";
import RegexUtil from "../utility/RegexUtil";
import { Doc } from "../utility/TsTypes";

const props = Zone.properties;

const findAll = async (pageIndex: number, pageSize: number) =>
  Zone.m
    .find({}, { description: 0 })
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .exec();

const count = async () => Zone.m.countDocuments().exec();
const findById = async (id: string) => Zone.m.findById(id).orFail().exec();
const searchByName = async (name: string) =>
  Zone.m
    .find(
      {
        name: { $regex: RegexUtil.containsWordStartingBy(name), $options: "i" },
      },
      { _id: 1, name: 1 }
    )
    .limit(props.search.maxResult)
    .sort({ name: 1 })
    .exec();

const save = async (zone: Doc<TypeZone>) => zone.save();

export default { findAll, count, findById, searchByName, save };
