import UriConfigs from "../configs/UriConfigs";
import SpecyController from "../controller/SpecyController";
import { IAppRoute } from "./IRoute";

const URIS = UriConfigs.URIS;

const routes: IAppRoute[] = [
  {
    method: "GET",
    uri: URIS.species,
    handlers: [SpecyController.getAll],
  },
];

export default { routes };
