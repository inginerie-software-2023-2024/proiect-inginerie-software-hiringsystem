import { MiddlewareFactory } from "@/types/middleware";
import { SessionData, defaultSession, sessionOptions } from "@/types/session";
import { sealData, getIronSession} from "iron-session";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import {
  NextResponse,
  NextRequest,
  NextMiddleware,
  NextFetchEvent,
} from "next/server";

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
}

// injects the access token into request and returns the new session
// in case it did update
export async function refreshTokenAndGetNewSession(
  request: NextRequest, session: SessionData
): Promise<SessionData> {
  if (session.refreshToken && session.accessTokenExpireDate) {
    if (session.accessTokenExpireDate < new Date().getTime()) {
      const newToken = await getNewAccessToken(session.refreshToken);
      if (newToken) {
        session.accessToken = newToken;
        const decoded = jwtDecode<{ userType: string; exp: number }>(newToken);
        session.accessTokenExpireDate = decoded.exp * 1000;
        session.roles = [decoded.userType];

        request.headers.set("Authorization", `Bearer ${session.accessToken}`);
        return {...session};
      } else {
        return defaultSession;
      }
    }

    request.headers.set("Authorization", `Bearer ${session.accessToken}`);
  }

  return session;
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

export const withAccessToken: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    let res = await next(request, _next);
    if (!request.nextUrl.pathname.startsWith("/api/")){
      return res;
    }
    const oldSession = await getIronSession<SessionData>(cookies(), sessionOptions);
    const newSession = await refreshTokenAndGetNewSession(request, oldSession);
    res = NextResponse.next({
      ...res,
      request,
    });

    if (Object.entries(newSession).toString() === Object.entries(defaultSession).toString()){
      (res as NextResponse).cookies.delete(sessionOptions.cookieName);
    }
    else if (oldSession !== newSession) {
      await saveSessionMiddleware(newSession, res as NextResponse);
    }

    return res;
  };
};
