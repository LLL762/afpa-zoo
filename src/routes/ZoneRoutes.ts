import UriConfigs from "../configs/UriConfigs";
import ZoneController from "../controller/ZoneController";
import { IAppRoute } from "./IRoute";

const routes: IAppRoute[] = [
  {
    method: "GET",
    uri: UriConfigs.URIS.zones,
    handlers: [ZoneController.getAll],
  },
];

export default { routes };
