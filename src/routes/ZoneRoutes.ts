import UriConfigs from "../configs/UriConfigs";
import ZoneController from "../controller/ZoneController";
import { IAppRoute } from "./IRoute";

const URIS = UriConfigs.URIS;


const routes: IAppRoute[] = [
  {
    method: "GET",
    uri: URIS.zones,
    handlers: [ZoneController.getAll],
  },
  {
    method: "GET",
    uri: URIS.zones + "/" + UriConfigs.PATHVARS.id,
    handlers: [ZoneController.getById]
  }


];

export default { routes };
