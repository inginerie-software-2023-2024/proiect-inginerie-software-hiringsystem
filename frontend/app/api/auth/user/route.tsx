import { defaultSession } from "@/types/session";
import {
  getServerSession,
} from "@/lib/sessionServerActions";

// read session
export async function GET() {
  const session = await getServerSession();

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(
    session,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // tokenii n-ar trebui transmisi catre frontend, dar m-am saturat de buguri in middleware
  // return Response.json(
  //   {
  //     ...session,
  //     accessToken: undefined,
  //     refreshToken: undefined,
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
}
