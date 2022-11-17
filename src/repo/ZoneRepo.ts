import Zone, { TypeZone } from "../model/Zone";
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
    .find({
      $text: {
        $search: name,
        $language: "english",
        $caseSensitive: false,
      },
    })
    .limit(props.search.maxResult)
    .sort({ score: 1 })
    .exec();

const save = async (zone: Doc<TypeZone>) => zone.save();
export default { findAll, count, findById, searchByName, save };
