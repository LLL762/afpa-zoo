import { body } from "express-validator";
import Msg from "../messages/ValidationMsg";
import validator from "validator";
import Animal from "../model/Animal";

const props = Animal.properties;

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

const validateFed = () => {
    return body("fed")
        .optional()
        .isBoolean()
        .withMessage(Msg.typeMustBe("fed", "boolean"));
}

const validateOut = () => {
    return body("out")
        .optional()
        .isBoolean()
        .withMessage(Msg.typeMustBe("out", "boolean"));
}

const validateStimulated = () => {
    return body("stimulated")
        .optional()
        .isBoolean()
        .withMessage(Msg.typeMustBe("stimulated", "boolean"));
}

const validateSex = () => {
    const sexeValues = props.sexe.values;
    return body("sexe")
        .optional()
        .isIn(sexeValues)
        .withMessage(Msg.enumValue("sexe", sexeValues));
}

const validateBirthDate = () => {
    const sexeValues = props.sexe.values;
    return body("birthDate")
        .optional()
        .isISO8601()
        .withMessage(Msg.typeMustBe("birthDate", "a date in iso 8601 format."))
        .bail()
        .isBefore()
        .withMessage(Msg.noFuture("birthDate"));
}

const validateManagedSince = () => {
    const sexeValues = props.sexe.values;
    return body("managedSince")
        .optional()
        .isISO8601()
        .withMessage(Msg.typeMustBe("managedSince", "a date in iso 8601 format."))
        .bail()
        .isBefore()
        .withMessage(Msg.noFuture("managedSince"));
}

const validateEnclosure = () => {
    body("enclosure")
        .optional()
        .isMongoId()
        .withMessage(Msg.typeMustBe("enclosure", "a valid mongo id"))
}

const validateImgUrl = () => {
    body("imgUrl")
        .optional()
        .isURL()
        .withMessage(Msg.typeMustBe("imgUrl", "a valid url"))
}

const validateSpecy = () => {
    body("specy")
        .optional()
        .isMongoId()
        .withMessage(Msg.typeMustBe("specy", "a valid mongo id"))
}

const validateCreate = () => [
    validateName(true),
    validateEnclosure(),
    validateSpecy(),
    validateImgUrl(),
    validateSex(),
    validateBirthDate(),
    validateFed(),
    validateOut(),
    validateStimulated(),
    validateManagedSince(),
]

const validateUpdate = () => [
    validateName(false),
    validateEnclosure(),
    validateSpecy(),
    validateImgUrl(),
    validateSex(),
    validateBirthDate(),
    validateFed(),
    validateOut(),
    validateStimulated(),
    validateManagedSince(),
]



export default { validateCreate, validateUpdate }















