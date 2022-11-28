import Animal from "../../model/Animal";
import { IMockDataUtil } from "./IMockDataUtil";

const data = [
  {
    _id: "507f1f77bcf86cd799439011",
    name: "Drako",
    birthDate: "2018-12-10T13:49:51.141Z",
    managedSince: "2020-12-10T13:49:51.141Z",
    sexe: "M",
    out: false,
    fed: true,
    stimulated: true,
    observations: [
      {
        content: "Bigger than me",
        author: "637deb9f673cbfb479201d23",
      },
      {
        content: "I think he has a crush on me",
        author: "637deb9f673cbfb479201d24",
      },
    ],
    enclosure: "507f1f77bcf86cd799439011",
    specy: "63847697e9f4b6170d1977b7",
  },
  {
    _id: "507f1f77bcf86cd799439012",
    name: "Ginger",
    birthDate: "2018-12-10T13:49:51.141Z",
    managedSince: "2020-12-10T13:49:51.141Z",
    sexe: "F",
    out: false,
    fed: false,
    stimulated: true,
    observations: [
      {
        content: "I can jump highter than her",
        author: "637deb9f673cbfb479201d23",
      },
    ],
    enclosure: "507f1f77bcf86cd799439011",
    specy: "63847697e9f4b6170d1977b7",
  },
  {
    _id: "507f1f77bcf86cd799439013",
    name: "Donatello",
    specy: "63847697e9f4b6170d1977bd",
    birthDate: "2018-12-10T13:49:51.141Z",
    managedSince: "2020-12-10T13:49:51.141Z",
    sexe: "undefined",
    out: false,
    fed: true,
    stimulated: false,
  },
] as const;

const util: IMockDataUtil = {
  insert: async function () {
    await Animal.m.insertMany(data);
  },
  clean: async function () {
    await Animal.m.deleteMany({}).exec();
  },
} as const;

export default { util, data };
