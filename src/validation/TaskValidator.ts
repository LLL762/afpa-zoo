import { TypeTask } from "../model/Task";

const validateTypeResource = (task: TypeTask): boolean => {
  if (!task.type) {
    return true;
  }
  const split = task.type.split("_");
  const prefix = split[0];

  switch (prefix) {
    case "ANIMAL":
      return typeof task.animals !== "undefined" && task.animals.length > 0;
    case "ENCLOSURE":
      return (
        typeof task.enclosures !== "undefined" && task.enclosures.length > 0
      );
    default:
      return true;
  }
};

export default { validateTypeResource };
