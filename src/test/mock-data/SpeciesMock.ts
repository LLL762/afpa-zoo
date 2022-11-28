import Specy from "../../model/Specy";
import { IMockDataUtil } from "./IMockDataUtil";

const data = [
  {
    _id: "63847697e9f4b6170d1977b7",
    name: "Kangaroo",
    description: "Jumpy jumpy data",
    observations: [
      {
        content: "They like boxing a lot",
        author: "637deb9f673cbfb479201d23",
      },
      {
        content: "I prefer turtles",
        author: "637deb9f673cbfb479201d24",
      },
    ],
    sociable: false,
    dangerous: true,
    enclosures: [{ _id: "507f1f77bcf86cd799439011" }],
  },
  {
    _id: "63847697e9f4b6170d1977ba",
    name: "Ostrich",
    description: "A very big bird",
    sociable: false,
    dangerous: true,
    enclosures: [{ _id: "507f1f77bcf86cd799439011" }],
  },
  {
    _id: "63847697e9f4b6170d1977bb",
    name: "Koala",
    description: "Better than a teddy bear",
    observations: [
      {
        content: "Cute little thing",
        author: "637deb9f673cbfb479201d24",
      },
    ],
    sociable: false,
    dangerous: false,
    enclosures: [{ _id: "507f1f77bcf86cd799439012" }],
  },
  {
    _id: "63847697e9f4b6170d1977bd",
    name: "Turtle",
    description: "Slow slow slow",
    observations: [
      {
        content: "I punched one, i got hurt",
        author: "637deb9f673cbfb479201d23",
      },
    ],
    sociable: false,
    dangerous: false,
    enclosures: [{ _id: "507f1f77bcf86cd799439013" }],
  },
] as const;

const util: IMockDataUtil = {
  insert: async function () {
    await Specy.m.insertMany(data);
  },
  clean: async function () {
    await Specy.m.deleteMany({}).exec();
  },
} as const;

export default { util, data };
