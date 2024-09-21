import "client-only";
import { Cookies } from "react-cookie";
import { Endpoints, Methods } from "./constants";

interface IApiTemplate {
  method: Methods;
  url: Endpoints;
  data?: any;
  headers?: any;
}

export const apiTemplate = async ({ method = Methods.GET, url, data = {}, headers }: IApiTemplate) => {
  const urlWithSearchParams = method === Methods.GET ? `${url}?${new URLSearchParams(data).toString()}` : url;
  const cookies = new Cookies();
  const token = cookies.get("token");

  try {
    const response = await fetch(`/api/${urlWithSearchParams}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        ...headers,
      },
      body: method !== Methods.GET ? JSON.stringify(data) : undefined,
    });
    return {
      status: response.status,
      data: await response.json(),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: { message: "Internal server error" },
      details: error,
    };
  }
};
