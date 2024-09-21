import "server-only";
import { Endpoints, Methods } from "./constants";
import { cookies } from "next/headers";

interface IApiTemplate {
  method: Methods;
  url: Endpoints;
  data?: any;
  headers?: any;
}

export const apiTemplate = async ({ method = Methods.GET, url, data = {}, headers }: IApiTemplate) => {
  const urlWithSearchParams = method === Methods.GET ? `${url}?${new URLSearchParams(data).toString()}` : url;
  const token = cookies().get("token")?.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/${urlWithSearchParams}`, {
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
