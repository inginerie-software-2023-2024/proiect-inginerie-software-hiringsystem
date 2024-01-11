import { getServerSession } from "@/lib/sessionServerActions";
import { NextRequest, NextResponse } from "next/server";

const logoutErrorResponse = (errorMessage: any): NextResponse => {
  return new NextResponse(JSON.stringify({ errorMessage }), {
    status: 401,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session.isLoggedIn) {
    return logoutErrorResponse("Not logged in");
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/auth/logout`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.refreshToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    return logoutErrorResponse(errorData.message);
  }

  session.destroy();

  return new NextResponse("{}", { status: 200 });
}
