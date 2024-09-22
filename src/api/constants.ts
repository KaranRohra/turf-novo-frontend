export enum Endpoints {
  LOGIN = "auth/signin",
  REGISTER = "auth/signup",
  USER = "user",
  PROFILE = "profile",
}

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface IApiTemplate {
  method: Methods;
  url: Endpoints;
  data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  headers?: Record<string, string>;
  baseUrl?: string;
}
