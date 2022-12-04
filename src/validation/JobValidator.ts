import { body } from "express-validator";
import Msg from "../messages/ValidationMsg";
import Job from "../model/Job";

const props = Job.properties;

const validateName = (required: boolean, nested: boolean) => {
    const min = props.name.minLength;
    const max = props.name.maxLength;
    let start = nested ? body("job.name").trim() : body("name").trim();
    start = required
        ? start.not().isEmpty().withMessage(Msg.required("name")).bail()
        : start.optional();
    return start
        .isLength({ min: min, max: max })
        .withMessage(Msg.betweenLength("name", min, max))
}

const validateDescription = (required: boolean, nested: boolean) => {
    const min = props.description.minLength;
    const max = props.description.maxLength;
    let start = nested ? body("job.description").trim() : body("description").trim();
    start = required
        ? start.not().isEmpty().withMessage(Msg.required("description")).bail()
        : start.optional();
    return start
        .isLength({ min: min, max: max })
        .withMessage(Msg.betweenLength("description", min, max))
}

