import { body } from "express-validator";
import Msg from "../messages/ValidationMsg";
import Role from "../model/Role";

const props = Role.properties;
const nameValues = Object.keys(props.name)

const validateName = (required: boolean, nested: boolean) => {
    let start = nested ? body("role.name").trim() : body("name").trim();
    start = required
        ? start.not().isEmpty().withMessage(Msg.required("name")).bail()
        : start.optional();
    return start
        .isIn(nameValues)
        .withMessage(Msg.enumValue("name", nameValues))
}

const validateAccessLevel = (nested: boolean) => {
    const min = props.accessLevel.min;
    const max = props.accessLevel.max;
    let start = nested ? body("role.accessLevel") : body("accessLevel");

    return start
        .optional()
        .trim()
        .isInt({ min: min, max: max })
        .withMessage(Msg.nbBetween("accessLevel", min, max))
}