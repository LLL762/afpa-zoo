import Ajv from "ajv";

const isValidJsonSchema = (json: object) => {
  try {
    new Ajv().compile(json);
    return true;
  } catch (error) {
    return false;
  }
};

export default { isValidJsonSchema };
