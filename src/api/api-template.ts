import { IApiTemplate, Methods } from "./constants";

export const apiTemplate = async ({ method = Methods.GET, url, data = {}, headers, baseUrl = "" }: IApiTemplate) => {
  const urlWithSearchParams = method === Methods.GET ? `${url}?${new URLSearchParams(data).toString()}` : url;

  try {
    const response = await fetch(`${baseUrl}/api/${urlWithSearchParams}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
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
