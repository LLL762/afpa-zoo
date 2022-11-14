const URIS = {
  base: "/api",
  animals: "/animals",
} as const;

const PATHVARS = {
  id: "/:id",
} as const;

export default { URIS, PATHVARS };
