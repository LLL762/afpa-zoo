import TokenFilter from "../auth/TokenFilter";
import UriConfigs from "../configs/UriConfigs";
import TaskController from "../controller/TaskController";
import ResourceValidator from "../validation/ResourceValidator";
import TaskValidator from "../validation/TaskValidator";
import { IAppRoute } from "./IRoute";

const URIS = UriConfigs.URIS;
const PATH_VARS = UriConfigs.PATHVARS;

const routes: IAppRoute[] = [
  {
    method: "GET",
    uri: URIS.tasks,
    handlers: [TaskController.getAll],
  },
  {
    method: "GET",
    uri: URIS.tasks + "/" + UriConfigs.PATHVARS.id,
    handlers: [TaskController.getById],
  },
  {
    method: "POST",
    uri: URIS.tasks,
    handlers: [
      TokenFilter.filter,
      TaskValidator.validatePost(),
      ResourceValidator.checkRequest,
      TaskController.postHandler,
    ],
  },
  {
    method: "PUT",
    uri: URIS.tasks + "/" + UriConfigs.PATHVARS.id,
    handlers: [TaskController.update],
  },
  {
    method: "PATCH",
    uri: URIS.tasks + "/" + UriConfigs.PATHVARS.id + URIS.assignTo,
    handlers: [TaskController.addAssignTo],
  },
  {
    method: "DELETE",
    uri:
      URIS.tasks + "/" + PATH_VARS.id + URIS.assignTo + "/" + PATH_VARS.userId,
    handlers: [TaskController.removeAssignTo],
  },
  {
    method: "PATCH",
    uri: URIS.tasks + "/" + UriConfigs.PATHVARS.id + URIS.animals,
    handlers: [TaskController.addAnimals],
  },
  {
    method: "DELETE",
    uri:
      URIS.tasks + "/" + PATH_VARS.id + URIS.animals + "/" + PATH_VARS.animalId,
    handlers: [TaskController.removeAnimal],
  },
  {
    method: "PATCH",
    uri: URIS.tasks + "/" + UriConfigs.PATHVARS.id + URIS.enclosures,
    handlers: [TaskController.addEnclosures],
  },
  {
    method: "DELETE",
    uri:
      URIS.tasks +
      "/" +
      PATH_VARS.id +
      URIS.enclosures +
      "/" +
      PATH_VARS.enclosureId,
    handlers: [TaskController.removeEnclosure],
  },
];

export default { routes };
