import { body, query } from "express-validator";
import ValidationMsg from "../messages/ValidationMsg";
import Zone from "../model/Zone";
import ResourceValidator from "./ResourceValidator";

const props = Zone.properties;

const validateName = () => {
  const min = props.name.minLength;
  const max = props.name.maxLength;

  return body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage(ValidationMsg.required("name"))
    .bail()
    .isLength({ min: min, max: max })
    .withMessage(ValidationMsg.betweenLength("name", min, max));
};

const validateDescription = () => {
  const min = props.description.minLength;
  const max = props.description.maxLength;

  return body("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage(ValidationMsg.required("description"))
    .bail()
    .isLength({ min: min, max: max })
    .withMessage(ValidationMsg.betweenLength("description", min, max));
};

const mustHaveNameQuery = () => {
  const min = props.search.min;

  return query("name")
    .not()
    .isEmpty()
    .withMessage("name query param is required")
    .bail()
    .isString()
    .withMessage("name query param must be a string")
    .bail()
    .isLength({ min: min })
    .withMessage(ValidationMsg.minLength("name", min));
};

const validatePost = () => [validateName(), validateDescription()];
const validatePut = () => [
  ResourceValidator.validateId(),
  validateName(),
  validateDescription(),
];
const validateSearch = () => [mustHaveNameQuery()];

export default { validatePost, validatePut, validateSearch };