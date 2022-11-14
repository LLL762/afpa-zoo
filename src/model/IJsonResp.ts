export interface IJsonResp {
  readonly url: string;
  readonly method: string;
  readonly statusCode: number;
  readonly data?: any;
  readonly errors?: any;
}
