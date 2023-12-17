import { validateProtectedRoute } from "@/lib/protectRoutes";
import { MiddlewareFactory } from "@/types/middleware";
import { SessionData, sessionOptions } from "@/types/session";
import { getIronSession } from "iron-session";
import {
  NextMiddleware,
  NextRequest,
  NextFetchEvent,
  NextResponse,
} from "next/server";

const enhanceWithForbiddenRedirect = (
  request: NextRequest,
  response: NextResponse,
  route: string,
  arg: string,
  baseUrl: string
) => {
  const toReturn = NextResponse.next({
    status: 307,
    headers: {
      ...response.headers,
      location: new URL(route, baseUrl).toString(),
    },
    request,
    statusText: response.statusText,
  });
  toReturn.cookies.set("lastForbiddenMessage", arg);
  return toReturn;
};

const enhanceWithLoginRedirect = (
  request: NextRequest,
  response: NextResponse,
  redirect: string,
  baseUrl: string
) => {
  const toReturn = NextResponse.next({
    status: 307,
    headers: {
      ...response.headers,
      location: new URL(redirect, baseUrl).toString(),
    },
    request,
    statusText: response.statusText,
  });
  return toReturn;
};

const validateProtectedRoutesMiddleware = async (
  request: NextRequest,
  response: NextResponse
) => {
  const validateRoute = await validateProtectedRoute(
    request.nextUrl.pathname,
    () => getIronSession<SessionData>(request.cookies, sessionOptions)
  );
  if (validateRoute) {
    if ("forbidden" in validateRoute) {
      return enhanceWithForbiddenRedirect(
        request,
        response,
        validateRoute.forbidden,
        validateRoute.forbiddenArgs,
        request.url
      );
    }

    return enhanceWithLoginRedirect(
      request,
      response,
      validateRoute.route,
      request.url
    );
  }
};

export const withProtectedRoutes: MiddlewareFactory = (
  next: NextMiddleware
) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next);
    if (res) {
      const validateAnswer = await validateProtectedRoutesMiddleware(
        request,
        res as NextResponse
      );

      if (validateAnswer) return validateAnswer;
    }
    return res;
  };
};
