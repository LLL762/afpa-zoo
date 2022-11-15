import Zone from "../../model/Zone";

const data = [
  {
    _id: 1,
    name: "Australia",
    description: "Australia",
  },
  {
    _id: 2,
    name: "Asia",
    description: "Asia",
  },
  {
    _id: 3,
    name: "Desert Africa",
    description: "Desert Africa",
  },
  {
    _id: 4,
    name: "Forest North America",
    description: "Forest North America",
  },
  {
    _id: 5,
    name: "Savannah Africa",
    description: "Savannah Africa",
  },
  {
    _id: 6,
    name: "Mountain Europa",
    description: "Mountain Europa",
  },
];

const insert = async () => {
  Zone.m.insertMany(data);
};
const clean = async () => {
  Zone.m.collection.drop();
};

export default { insert, clean };
