import { NextResponse } from "next/server";
import { withAccessToken } from "@/middlewares/withAccessToken";
import { withProtectedRoutes } from "@/middlewares/withProtectedRoutes";

export function defaultMiddleware() {
  return NextResponse.next();
}

export default withProtectedRoutes(withAccessToken(defaultMiddleware));

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
