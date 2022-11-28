//password = ${username}3$7777

import ApiUser from "../../model/ApiUser";
import { IMockDataUtil } from "./IMockDataUtil";

const data = [
  {
    _id: "637deb9f673cbfb479201d23",
    username: "Arnold",
    password: "$2a$10$TXQqEvZbYtRh2dLKC8MnI.QacZJK0Kc5tnSYiI.H27rvFurb1NeDC",
    email: "arnol@gmail.com",
    firstname: "Arnold",
    lastname: "Schwarz",
    job: {
      name: "Action superstar",
      description:
        "Schwarzenegger wanted to move from bodybuilding into acting",
    },
    role: { name: "GOD", accessLevel: 100 },
    zones: ["507f1f77bcf86cd799439014"],
  },
  {
    _id: "637deb9f673cbfb479201d24",
    username: "Rebecca",
    password: "$2a$10$zERaiGKGzYaZ2TwSrfgTZusF2qKj0ScmZ.k.0lPlP.aV.r36K5bpq",
    email: "rebecca@gmail.com",
    firstname: "Rebecca",
    lastname: "Roberts",
    job: {
      name: "veterinarian",
      description: "Veterinarians treat disease",
    },
    role: { name: "STAFF", accessLevel: 50 },
    permissions: [
      {
        type: "READ",
        level: "private",
        resource: "ZONE",
        scope: "RESOURCE",
        resources: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
      },
    ],
  },
];

const createData = () => JSON.parse(JSON.stringify(data)) as typeof data;

const util: IMockDataUtil = {
  insert: async function () {
    await ApiUser.m.insertMany(data);
  },
  clean: async function () {
    await ApiUser.m.deleteMany({}).exec();
  },
} as const;

export default { util, createData };
