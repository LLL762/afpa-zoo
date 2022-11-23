import passport from "passport";
import TokenFilter from "../auth/TokenFilter";
import UriConfigs from "../configs/UriConfigs";
import ZoneController from "../controller/ZoneController";
import ResourceValidator from "../validation/ResourceValidator";
import ValidationUtility from "../validation/ValidationUtility";
import ZoneValidator from "../validation/ZoneValidator";

import { IAppRoute } from "./IRoute";

const URIS = UriConfigs.URIS;

const routes: IAppRoute[] = [
  {
    method: "GET",
    uri: URIS.zones,
    handlers: [
      TokenFilter.filter,
      ValidationUtility.checkPageQueryParams(),
      ResourceValidator.checkRequest,
      ZoneController.getAll,
    ],
  },
  {
    method: "GET",
    uri: URIS.zones + "/" + UriConfigs.PATHVARS.id,
    handlers: [
      ValidationUtility.checkIdReqParam(),
      ResourceValidator.checkRequest,
      ZoneController.getById,
    ],
  },
  {
    method: "PUT",
    uri: URIS.zones + "/" + UriConfigs.PATHVARS.id,
    handlers: [
      ZoneValidator.validateUpdate(),
      ResourceValidator.checkRequest,
      ZoneController.updateZone,
    ],
  },
  {
    method: "POST",
    uri: URIS.zones,
    handlers: [
      ZoneValidator.validatePost(),
      ResourceValidator.checkRequest,
      ZoneController.create,
    ],
  },
  {
    method: "GET",
    uri: URIS.search + URIS.zones,
    handlers: [
      ZoneValidator.validateSearch(),
      ResourceValidator.checkRequest,
      ZoneController.search,
    ],
  },
  {
    method: "GET",
    uri: URIS.zones + "/" + UriConfigs.PATHVARS.id + URIS.enclosures,
    handlers: [
      ZoneValidator.validateGetEnclosures(),
      ResourceValidator.checkRequest,
      ZoneController.getEnclosures,
    ],
  },
];

export default { routes };
