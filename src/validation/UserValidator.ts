import { body } from "express-validator"
import Msg from "../messages/ValidationMsg";
import ApiUser from "../model/ApiUser";

const props = ApiUser.properties;

const validateUsername = (required: boolean) => {
    const min = props.username.minLength;
    const max = props.username.maxLength;

    let start = body("username").trim();
    start = required
        ? start.not().isEmpty().withMessage(Msg.required("username")).bail()
        : start.optional();
    return start
        .isLength({ min: min, max: max })
        .withMessage(Msg.betweenLength("username", min, max))
}

const validateEmail = (required: boolean) => {
    const min = props.minLength;
    const max = props.maxLength;

    let start = body("email").trim();
    start = required
        ? start.not().isEmpty().withMessage(Msg.required("email")).bail()
        : start.optional();
    return start
        .isLength({ min: min, max: max })
        .withMessage(Msg.betweenLength("email", min, max))
        .bail()
        .isEmail()
        .withMessage(Msg.invalidEmail)
        .normalizeEmail()
}

const validatePassword = (required: boolean) => {
    const max = props.password.maxLength;
    let start = body("password");
    start = required
        ? start.not().isEmpty().withMessage(Msg.required("password")).bail()
        : start.optional();
    return start
        .isLength({ max: max })
        .withMessage(Msg.maxLength("password", max))
        .bail()
        .isStrongPassword(ApiUser.properties.password.details)
        .withMessage(Msg.weakPassword)
        .bail()
        .custom((value: string, { req }) => value == req.body.confirmPassword)
        .withMessage(
            "confirm-password : password and confirm-password do not matches "
        );
}

const validateFirstName = (required: boolean) => {
    const min = props.minLength;
    const max = props.maxLength;
    let start = body("firstname").trim();
    start = required
        ? start.not().isEmpty().withMessage(Msg.required("firstname")).bail()
        : start.optional();
    return start
        .isLength({ min: min, max: max })
        .withMessage(Msg.betweenLength("firstname", min, max))
}

const validateLastName = (required: boolean) => {
    const min = props.minLength;
    const max = props.maxLength;
    let start = body("lastname").trim();
    start = required
        ? start.not().isEmpty().withMessage(Msg.required("lastname")).bail()
        : start.optional();
    return start
        .isLength({ min: min, max: max })
        .withMessage(Msg.betweenLength("lastname", min, max))
}











