import { NextRequest, NextResponse } from "next/server";
import { validateProtectedRoute } from "@/lib/protectRoutes";

const PUBLIC_FILE = /\.(.*)$/;

const generateRedirectForbidden = (
  route: string,
  arg: string,
  baseUrl: string
) => {
  const res = NextResponse.redirect(new URL(route, baseUrl));
  res.cookies.set(
    "lastForbiddenMessage", arg
  );
  return res;
};

const generateRedirectLogin = (redirect: string, baseUrl: string) => {
  return NextResponse.redirect(new URL(redirect, baseUrl));
};

const validateProtectedRoutesMiddleware = async (request: NextRequest) => {
  const validateRoute = await validateProtectedRoute(request.nextUrl.pathname);
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
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  )
    return NextResponse.next();

  const validateRoute = await validateProtectedRoutesMiddleware(request);
  if (validateRoute) return validateRoute;

  return NextResponse.next();
}
