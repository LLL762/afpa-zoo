import UriConfigs from "../configs/UriConfigs";
import AnimalController from "../controller/AnimalController";
import { IAppRoute } from "./IRoute";

const URI = UriConfigs.URIS.animals;

const routes: IAppRoute[] = [
  {
    method: "GET",
    uri: URI,
    handlers: [AnimalController.getAllHandler],
  },
  {
    method: "GET",
    uri: URI + "/" + UriConfigs.PATHVARS.id,
    handlers: [AnimalController.getByIdHandler],
  },
  {
    method: "PATCH",
    uri: URI + "/" + UriConfigs.PATHVARS.id,
    handlers: [AnimalController.patchHandler],
  }
];

export default { URI, routes };
