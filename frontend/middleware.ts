import { NextRequest, NextResponse } from "next/server";
import { validateProtectedRoute } from "@/lib/protectRoutes";
import { getServerSession } from "./lib/sessionServerActions";
import { getIronSession, sealData, unsealData } from "iron-session";
import { SessionData, sessionOptions } from "./types/session";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { withAccessToken } from "./middlewares/withAccessToken";

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

async function saveSessionMiddleware(
  session: SessionData,
  response: NextResponse
) {
  const sealedData = await sealData(session, {
    password: sessionOptions.password,
    ttl: sessionOptions.ttl,
  });

  response.cookies.set(
    sessionOptions.cookieName,
    sealedData,
    sessionOptions.cookieOptions
  );

  return response;
}

export async function refreshToken(response: NextResponse) : Promise<NextResponse> {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (session.refreshToken && session.accessTokenExpireDate) {
    if (session.accessTokenExpireDate < new Date().getTime()) {
      const newToken = await getNewAccessToken(session.refreshToken);
      if (newToken) {
        session.accessToken = newToken;
        const decoded = jwtDecode<{ userType: string; exp: number }>(newToken);
        session.accessTokenExpireDate = decoded.exp * 1000;
        session.roles = [decoded.userType];
      } else {
        session.destroy();
        return getServerSession();
      }

      // console.log(session);
      await saveSessionMiddleware(session, response);

      // await session.save();
      // revalidatePath("/api/auth");
      // return session;
    }

    return response;
  }

  return response;
}

async function getNewAccessToken(refreshToken: string) {
  const response = await fetch(
    "http://localhost:8081/api/v1/auth/refresh-token",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  const data = await response.json();
  if (response.ok) return data.access_token;

  return false;
}

async function injectAccessTokenFromResponse(
  request: NextRequest,
  response: NextResponse
) {
  const sealedData = response.cookies.get(sessionOptions.cookieName)?.value;
  if (!sealedData) {
    return;
  }

  const unsealedSession = await unsealData<SessionData>(sealedData, {
    password: sessionOptions.password,
    ttl: sessionOptions.ttl,
  });

  request.headers.set('Authorization', `Bearer ${unsealedSession.accessToken}`);
}

export function defaultMiddleware() {
  return NextResponse.next();
}

//export async function middleware(request: NextRequest) {
  // let res;
  // const validateRoute = await validateProtectedRoutesMiddleware(request);
  // if (validateRoute) {
  //   res = validateRoute;
  // } else {
  //   res = NextResponse.next();
  // }

  // res = await refreshToken(res);

  // await injectAccessTokenFromResponse(request, res);

  // return res;
  // // return NextResponse.next({
  // //   request: { headers: request.headers }
  // // })
//}

export default withAccessToken(defaultMiddleware);

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
