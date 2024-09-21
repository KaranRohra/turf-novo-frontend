import "client-only";
import { apiTemplate } from "@/api/api-template";
import { IApiTemplate, Methods } from "@/api/constants";
import { Cookies } from "react-cookie";

export const apiCall = async ({ method = Methods.GET, url, data = {}, headers }: IApiTemplate) => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  return apiTemplate({ method, url, data, headers: { Authorization: "Bearer " + token, ...headers } });
};
