import UriConfigs from "../configs/UriConfigs";
import EnclosureController from "../controller/EnclosureController";
import { IAppRoute } from "./IRoute";

const URIS = UriConfigs.URIS;
const routes: IAppRoute[] = [
  {
    method: "GET",
    uri: URIS.enclosures,
    handlers: [EnclosureController.getAll],
  },
  {
    method: "GET",
    uri: URIS.enclosures + "/" + UriConfigs.PATHVARS.id,
    handlers: [EnclosureController.getById],
  }

];

export default { routes }
