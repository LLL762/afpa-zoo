import Task, { TypeTask } from "../model/Task";
import { body } from "express-validator";
import Msg from "../messages/ValidationMsg";
import validator from "validator";

const props: any = Task.properties;

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

const validateName = (required: boolean) => {
  const min = props.name.minLength;
  const max = props.name.maxLength;
  let start = body("name").trim();

  start = required
    ? start.not().isEmpty().withMessage(Msg.required("name")).bail()
    : start.optional();

  return start
    .isLength({ min: min, max: max })
    .withMessage(Msg.betweenLength("name", min, max));
};

const validateDescription = () => {
  const min = props.description.minLength;
  const max = props.description.maxLength;

  return body("description")
    .trim()
    .optional()
    .isLength({ min: min, max: max })
    .withMessage(Msg.betweenLength("description", min, max));
};

const validatePriority = () => {
  const min = props.priority.min;
  const max = props.priority.max;

  return body("priority")
    .trim()
    .optional()
    .isInt({ min: min, max: max })
    .withMessage(Msg.nbBetween("priority", min, max));
};

const validateStatus = () => {
  return body("status")
    .trim()
    .optional()
    .isIn(props.status.values)
    .withMessage(Msg.enumValue("status", props.status.values));
};

const validateType = () => {
  return body("type")
    .trim()
    .optional()
    .isIn(props.type.values)
    .withMessage(Msg.enumValue("type", props.type.values));
};

const validateAnimals = (required: boolean) => {
  let start = body("animals");
  start = required
    ? start.not().isEmpty().withMessage(Msg.required("animals")).bail()
    : start.optional();

  return start
    .isArray({ max: props.animals.max })
    .withMessage(Msg.maxSize("animals", props.animals.max))
    .custom((ids) => ids.every((id: string) => validator.isMongoId(id)))
    .withMessage(Msg.containMongoId("animals"));
};

const validateEnclosures = (required: boolean) => {
  let start = body("enclosures");
  start = required
    ? start.not().isEmpty().withMessage(Msg.required("animals")).bail()
    : start.optional();

  return start
    .isArray({ max: props.animals.max })
    .withMessage(Msg.maxSize("animals", props.enclosures.max))
    .custom((ids) => ids.every((id: string) => validator.isMongoId(id)))
    .withMessage(Msg.containMongoId("enclosures"));
};

const validatePost = () => [
  validateName(true),
  validateDescription(),
  validatePriority(),
  validateType(),
  validateStatus(),
  validateAnimals(false),
  validateEnclosures(false),
];

export default { validateTypeResource, validatePost };
