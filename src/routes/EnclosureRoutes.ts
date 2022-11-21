import UriConfigs from "../configs/UriConfigs";
import { IAppRoute } from "./IRoute";

const URIS = UriConfigs.URIS;
const routes: IAppRoute[] = [
  {
    method: "GET",
    uri: URIS.enclosures,
    handlers: [],
  },
];
