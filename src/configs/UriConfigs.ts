import { Doc } from "../utility/TsTypes";

const URIS = {
  base: "/api",
  animals: "/animals",
  zones: "/zones",
  enclosures: "/enclosures",
  enclosuresTypes: "/enclosures/types",
  search: "/search",
  login: "/login",
  refreshToken: "/refresh-token",
  species: "/species",
  observations: "/observations",
  docs: "docs",
  tasks: "/tasks",
} as const;

const PATHVARS = {
  id: ":id",
} as const;

const getResourceUrl = <T>(resource: Doc<T>, key: keyof typeof URIS) => {
  return URIS.base + URIS[key] + "/" + resource._id;
};

const getUrlFromId = <T>(resourceId: string, key: keyof typeof URIS) => {
  return URIS.base + URIS[key] + "/" + resourceId;
};

export default { URIS, PATHVARS, getResourceUrl, getUrlFromId };
