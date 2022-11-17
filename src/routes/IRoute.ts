export interface IAppRoute {
  readonly method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  readonly uri: string;
  readonly handlers: any[];
}
