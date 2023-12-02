import { NextRequest, NextResponse } from "next/server";
import { validateProtectedRoute } from "@/lib/protectRoutes";
import { getServerSession } from "./lib/sessionServerActions";

const generateRedirectForbidden = (
  route: string,
  arg: string,
  baseUrl: string
) => {
  const res = NextResponse.redirect(new URL(route, baseUrl));
  res.cookies.set("lastForbiddenMessage", arg);
  return res;
};

const generateRedirectLogin = (redirect: string, baseUrl: string) => {
  return NextResponse.redirect(new URL(redirect, baseUrl));
};

const validateProtectedRoutesMiddleware = async (request: NextRequest) => {
  const validateRoute = await validateProtectedRoute(
    request.nextUrl.pathname,
    getServerSession
  );
  if (validateRoute) {
    if ("forbidden" in validateRoute) {
      return generateRedirectForbidden(
        validateRoute.forbidden,
        validateRoute.forbiddenArgs,
        request.url
      );
    }

    return generateRedirectLogin(validateRoute.route, request.url);
  }
};

export async function middleware(request: NextRequest) {
  const validateRoute = await validateProtectedRoutesMiddleware(request);
  if (validateRoute) return validateRoute;

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
