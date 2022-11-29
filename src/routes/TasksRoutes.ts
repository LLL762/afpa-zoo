import UriConfigs from "../configs/UriConfigs";
import SpecyController from "../controller/SpecyController";
import TaskController from "../controller/TaskController";
import { IAppRoute } from "./IRoute";

const URIS = UriConfigs.URIS;

const routes: IAppRoute[] = [
  {
    method: "GET",
    uri: URIS.tasks,
    handlers: [TaskController.getAll],
  },
];

export default { routes };
