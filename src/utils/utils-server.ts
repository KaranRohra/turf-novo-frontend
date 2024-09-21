import "server-only";
import { apiTemplate } from "@/api/api-template";
import { IApiTemplate, Methods } from "@/api/constants";
import { cookies } from "next/headers";

export const apiCall = async ({ method = Methods.GET, url, data = {}, headers }: IApiTemplate) => {
  const token = cookies().get("token")?.value;

  return apiTemplate({ method, url, data, headers: { Authorization: "Bearer " + token, ...headers }, baseUrl: process.env.NEXT_PUBLIC_BACKEND_API });
};
