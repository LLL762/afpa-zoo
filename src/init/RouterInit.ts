import { Router } from "express";
import UriConfigs from "../configs/UriConfigs";
import AnimalRoutes from "../routes/AnimalRoutes";
import { IAppRoute } from "../routes/IRoute";

const setUpRoutes = (router: Router, routes: IAppRoute[]) => {
  routes.forEach((route) => {
    switch (route.method) {
      case "GET":
        router.get(UriConfigs.URIS.base + route.uri, route.handlers);
        break;

      case "POST":
        router.post(UriConfigs.URIS.base + route.uri, route.handlers);
        break;

      case "PUT":
        router.put(UriConfigs.URIS.base + route.uri, route.handlers);
        break;

      case "PATCH":
        router.patch(UriConfigs.URIS.base + route.uri, route.handlers);
        break;

      case "DELETE":
        router.delete(UriConfigs.URIS.base + route.uri, route.handlers);
        break;

      default:
        throw new Error("");
    }
  });
};

export const initRouter = (router: Router) => {
  setUpRoutes(router, AnimalRoutes.routes);

  router.all("*", (req, res) => {
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