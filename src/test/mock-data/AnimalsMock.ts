import Animal from "../../model/Animal";

const animals = [
  {
    name: "Drako",
    birthDate: "2018-12-10T13:49:51.141Z",
    managedSince: "2020-12-10T13:49:51.141Z",
    sexe: "M",
    out: false,
    fed: true,
    stimulated: true,
    observations: "Annoying",
  },
];

const insert = async () => {
  Animal.m.insertMany(animals);
};

export default { insert };
