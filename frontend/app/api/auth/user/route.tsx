import { defaultSession } from "@/lib/session";
import { getServerSession } from "@/lib/sessionServerActions";

// read session
export async function GET() {
  const session = await getServerSession();

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json({
    ...session,
    accessToken: undefined,
    refreshToken: undefined,
  });
}
