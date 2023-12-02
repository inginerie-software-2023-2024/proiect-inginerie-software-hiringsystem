import { defaultSession } from "@/types/session";
import {
  getServerSession,
  refreshTokenGetSession,
} from "@/lib/sessionServerActions";

// read session
export async function GET() {
  const session = await refreshTokenGetSession();

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(
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
