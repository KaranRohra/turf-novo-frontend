import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Endpoints, Methods } from "./api/constants";
import UI_PATH from "./constants/ui-path-constants";
import { apiCall } from "./utils/utils-server";

const protectedRoutes = [UI_PATH.PROFILE];

export default async function middleware(req: NextRequest) {
  const user = await apiCall({
    method: Methods.GET,
    url: Endpoints.USER,
  });
  if (user.status !== 200 && protectedRoutes.includes(req.nextUrl.pathname as UI_PATH)) {
    const absoluteURL = new URL(UI_PATH.LOGIN, req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
