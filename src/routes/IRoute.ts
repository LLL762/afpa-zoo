import { RoleNameValue } from "../security/AuthorizationUtil";

export interface IAppRoute {
  readonly method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  readonly uri: string;
  readonly handlers: any[];
  readonly needAuth?: boolean;
  readonly role?: { name: RoleNameValue, highter?: boolean };
  readonly permissions?: { permission: () => boolean, roleOperator: "OR" | "AND" }
  readonly cacheable?: boolean;
}
