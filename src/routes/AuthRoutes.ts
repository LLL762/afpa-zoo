import JwtRefresh from "../auth/JwtRefresh";
import UriConfigs from "../configs/UriConfigs";
import AuthController from "../controller/AuthController";
import { IAppRoute } from "./IRoute";

const URIS = UriConfigs.URIS;

const routes: IAppRoute[] = [
  {
    method: "POST",
    uri: URIS.login,
    handlers: [AuthController.handleAuthRequest],
  },
  {
    method: "POST",
    uri: URIS.refreshToken,
    handlers: [JwtRefresh.filter, AuthController.handleRefreshJwt],
  },
];

export default { routes };
