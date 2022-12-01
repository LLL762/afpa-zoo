import { Error } from "mongoose";
import AnimalRepo from "../../repo/AnimalRepo";
import AnimalService from "../../service/AnimalService";
import ApiUserService from "../../service/ApiUserService";
import EnclosureService from "../../service/EnclosureService";
import { Doc } from "../../utility/TsTypes";
import { TypeTask } from "../Task";

const onDonePre = (updateObj: any) => {
  const status = updateObj.status;
  if (status == "DONE") {
    updateObj.resolvedAt = Date.now();
  } else {
    updateObj.$unset
      ? (updateObj.$unset.resolvedAt = 1)
      : (updateObj.$unset = { resolvedAt: 1 });
  }
};

const onDonePost = (task: Doc<TypeTask>) => {
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

const onAddAssignTo = async (updateObj: any) => {
  if (!updateObj?.$addToSet?.assignTo) {
    return;
  }
  const userIds = mapToString(updateObj.$addToSet.assignTo.$each);
  const doNotExist = await ApiUserService.existApiUsers(userIds);
  if (doNotExist.length > 0) {
    throw new Error.ValidationError();
  }
};

const onAddCreatedBy = async (task: Doc<TypeTask>) => {
  const id = task.createdBy.toString();
  const exist = await ApiUserService.existById(id);
  if (!exist) {
    throw new Error.ValidationError();
  }
};

const onAddAnimals = async (updateObj: any) => {
  if (!updateObj?.$addToSet?.animals) {
    return;
  }
  const animalIds = mapToString(updateObj.$addToSet.animals.$each);
  const doNotExist = await AnimalService.existAnimals(animalIds);

  if (doNotExist.length > 0) {
    throw new Error.ValidationError();
  }
};

const onAddEnclosure = async (updateObj: any) => {
  if (!updateObj?.$addToSet?.enclosures) {
    return;
  }

  const enclosureIds = mapToString(updateObj.$addToSet.enclosures.$each);
  const doNotExist = await EnclosureService.existsEnclosures(enclosureIds);
  if (doNotExist.length > 0) {
    throw new Error.ValidationError();
  }
};

const mapToString = (ids?: any[]): string[] => {
  if (!ids || ids.length == 0) {
    throw new Error("");
  }
  return ids.map((id) => id.toString());
};

export default {
  onDonePost,
  onDonePre,
  onAddAssignTo,
  onAddAnimals,
  onAddEnclosure,
};
