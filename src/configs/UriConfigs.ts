const URIS = {
  base: "/api",
  animals: "/animals",
  zones: "/zones",
} as const;

const PATHVARS = {
  id: "/:id",
} as const;

export default { URIS, PATHVARS };
