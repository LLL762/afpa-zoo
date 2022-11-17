const URIS = {
  base: "/api",
  animals: "/animals",
  zones: "/zones",
  search: "/search",
} as const;

const PATHVARS = {
  id: ":id",
} as const;

export default { URIS, PATHVARS };
