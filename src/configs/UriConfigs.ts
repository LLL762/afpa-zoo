const URIS = {
  base: "/api",
  animals: "/animals",
  zones: "/zones",
  enclosures: "/enclosures",
  search: "/search",
  login: "/login",
  refreshToken: "/refresh-token",
} as const;

const PATHVARS = {
  id: ":id",
} as const;

export default { URIS, PATHVARS };
