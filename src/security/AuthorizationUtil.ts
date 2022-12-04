import { Request, NextFunction } from "express";
import { IJwtPayload } from "../jwt/JwtUtil";
import Permission, { TypePermission } from "../model/Permission";
import Role from "../model/Role";

const props = Permission.properties;
const roleProps = Role.properties;
export type PermLevelValue = keyof typeof props.level;
export type RoleNameValue = keyof typeof roleProps.name;

const comparePermLevel = (actual: PermLevelValue, expected: PermLevelValue) => {
  return props.level[actual] >= props.level[expected];
};

const hasRole = (
  roleName: RoleNameValue,
  payload: IJwtPayload,
  orHighter: boolean
) => {
  const userRole = payload.role?.name;

  if (
    !userRole ||
    userRole.length === 0 ||
    !Object.keys(roleProps.name).includes(userRole)
  ) {
    return false;
  }

  return (
    (userRole as RoleNameValue) == roleName ||
    (orHighter &&
      roleProps.name[userRole as RoleNameValue] > roleProps.name[roleName])
  );
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

const checkToken = (req: Request, next: NextFunction) => {
  if (!req.user) {
    return next(new Error("TokenFilter must be apply first"));
  }
}

export default { hasRole, hasPermission, checkToken };
