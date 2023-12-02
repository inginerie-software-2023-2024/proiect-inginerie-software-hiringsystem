import { SessionData } from "@/types/session";
import { getServerSession } from "@/lib/sessionServerActions";
import { loginFormSchemaType } from "@/types/form/loginSchema";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const loginBackendData = async (payload: loginFormSchemaType) => {
  try {
    const response = await fetch(
      "http://localhost:8081/api/v1/auth/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error has occurred.");
    }

    const apiResponse = await response.json();
    const decoded = jwtDecode<{ userType: string; exp: number }>(
      apiResponse.access_token
    );

    const session: SessionData = {
      isLoggedIn: true,
      accessToken: apiResponse.access_token,
      accessTokenExpireDate: decoded.exp * 1000,
      refreshToken: apiResponse.refresh_token,
      email: payload.email,
      roles: [decoded.userType],
    };

    return session;
  } catch (error: any) {
    return {
      errorMessage: error.message || "An error has occurred.",
    };
  }
};

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  const payload = await request.json();
  const requestedSession = await loginBackendData(payload);
  if ("errorMessage" in requestedSession) {
    return NextResponse.json(
      {
        errorMessage: requestedSession.errorMessage,
      },
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  session.accessToken = requestedSession.accessToken;
  session.refreshToken = requestedSession.refreshToken;
  session.email = requestedSession.email;
  session.roles = requestedSession.roles;
  session.accessTokenExpireDate = requestedSession.accessTokenExpireDate;
  session.isLoggedIn = true;

  await session.save();

  return NextResponse.json(
    {
      ...session,
      accessToken: undefined,
      refreshToken: undefined,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
