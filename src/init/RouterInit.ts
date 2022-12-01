import { Router } from "express";
import TokenFilter from "../auth/TokenFilter";
import UriConfigs from "../configs/UriConfigs";
import AnimalRoutes from "../routes/AnimalRoutes";
import AuthRoutes from "../routes/AuthRoutes";
import EnclosureRoutes from "../routes/EnclosureRoutes";
import { IAppRoute } from "../routes/IRoute";
import SpecyRoute from "../routes/SpecyRoute";
import TasksRoutes from "../routes/TasksRoutes";
import ZoneRoutes from "../routes/ZoneRoutes";
import RoleFilter from "../security/RoleFilter";

const routesPack: IAppRoute[][] = [
  AnimalRoutes.routes,
  ZoneRoutes.routes,
  AuthRoutes.routes,
  EnclosureRoutes.routes,
  SpecyRoute.routes,
  TasksRoutes.routes,
];

const setUpRoutes = (router: Router, routes: IAppRoute[]) => {
  routes.forEach((route) => {
    let handlers: any[] = [];

    if (route.needAuth !== false) {
      handlers.push(TokenFilter.filter);
    }

    const role = route.role;

    if (role) {
      const roleFilter = RoleFilter.getFilter(role.name, role.highter ?? false);
      handlers.push(roleFilter);
    }

    handlers.push(route.handlers);

    switch (route.method) {
      case "GET":
        router.get(UriConfigs.URIS.base + route.uri, handlers);
        break;

      case "POST":
        router.post(UriConfigs.URIS.base + route.uri, handlers);
        break;

      case "PUT":
        router.put(UriConfigs.URIS.base + route.uri, handlers);
        break;

      case "PATCH":
        router.patch(UriConfigs.URIS.base + route.uri, handlers);
        break;

      case "DELETE":
        router.delete(UriConfigs.URIS.base + route.uri, handlers);
        break;

      default:
        throw new Error("");
    }
  });
};

export const initRouter = (router: Router) => {
  for (let routes of routesPack) {
    setUpRoutes(router, routes);
  }

  router.all("*", (req, res, next) => {
    if (req.url.startsWith("/" + UriConfigs.URIS.docs)) {
      return next();
    }

    res.status(404).json({
      url: req.url,
      method: req.method,
      status: 404,
      errors: [
        {
          method: `Method ${req.method}` + " is not supported at " + req.url,
        },
      ],
    });
  });
};
