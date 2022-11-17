import Ajv from "ajv";
import { CustomError } from "../error/CustomError";
import { Enclosure } from "../model/Enclosure";
import EnclosureType from "../model/EnclosureType";
import Zone from "../model/Zone";

const checkTypeData = async (enclosure: Enclosure) => {
  if (!(enclosure.type || enclosure.typeData)) {
    return;
  }
  if (!(enclosure.type && enclosure.typeData)) {
    throw new CustomError();
  }

  const type = await EnclosureType.m
    .findById(enclosure.type, { validationSchema: 1 })
    .exec();

  if (!type) {
    throw new CustomError("Ref type does not exist", 400, {});
  }
  const validate = new Ajv().compile(type.validationSchema);
  if (validate.errors) {
    throw new CustomError("Ref type does not exist", 400, validate.errors);
  }
};

const checkZone = async (enclosure: Enclosure) => {
  if (enclosure.zone) {
    return;
  }
  const zone = await Zone.m.exists({ _id: enclosure.zone }).exec();
  if (!zone) {
    throw new CustomError("Ref zone does not exist", 400, {});
  }
};

export default { checkTypeData, checkZone };
