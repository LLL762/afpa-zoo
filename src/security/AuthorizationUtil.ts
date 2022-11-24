import { IJwtPayload } from "../jwt/JwtUtil";
import Permission, { TypePermission } from "../model/Permission";

const props = Permission.properties;
type PermLevelValue = keyof typeof props.level;

const comparePermLevel = (actual: PermLevelValue, expected: PermLevelValue) => {
  return props.level[actual] >= props.level[expected];
};

const hasRole = (roleName: string, payload: IJwtPayload) => {
  return payload.role?.name == roleName;
};

const hasAccessLevel = (accessLevel: number, payload: IJwtPayload) => {
  return payload.role?.accessLevel ?? 0 >= accessLevel;
};

const hasPermission = (payload: IJwtPayload, permission: TypePermission) => {
  const permissions = payload.permissions;

  if (typeof permissions === "undefined") {
    return false;
  }

  const match = permissions.find(
    (perm) =>
      perm.type == permission.type &&
      perm.resource == permission.resource &&
      comparePermLevel(
        perm.level as PermLevelValue,
        permission.level as PermLevelValue
      ) &&
      (perm.scope == "ALL" ||
        permission.resources.every((id) => perm.resources.includes(id)))
  );

  return typeof match != "undefined";
};

export default { hasRole, hasAccessLevel, hasPermission };
