import { Types } from "mongoose";
import AnimalRepo from "../../repo/AnimalRepo";
import { TypeTask } from "../Task";

const onStatusUpdate = (task: TypeTask) => {
  if (!task.type) {
    return;
  }
  switch (task.type) {
    case "ANIMAL_FEED":
      AnimalRepo.feedAnimals(mapToString(task.animals));
      return;
    case "ANIMAL_STIMULATE":
      AnimalRepo.stimulateAnimals(mapToString(task.animals));
      return;
    case "ANIMAL_IN":
      AnimalRepo.inAnimals(mapToString(task.animals));
      return;
    case "ANIMAL_OUT":
      AnimalRepo.outAnimals(mapToString(task.animals));
      return;
    case "ENCLOSURE_FEED":
      AnimalRepo.feedAnimalsByEnclosure(mapToString(task.enclosures));
      return;
    case "ENCLOSURE_STIMULATE":
      AnimalRepo.stimulateAnimalsByEnclosure(mapToString(task.enclosures));
      return;
    case "ENCLOSURE_OUT":
      AnimalRepo.outAnimalsByEnclosure(mapToString(task.enclosures));
      return;
    case "ENCLOSURE_IN":
      AnimalRepo.inAnimalsByEnclosure(mapToString(task.enclosures));
      return;
    default:
      return;
  }
};

const mapToString = (ids?: any[]): string[] => {
  if (!ids || ids.length == 0) {
    throw new Error("");
  }
  return ids.map((id) => id.toString());
};

export default { onStatusUpdate };
