import { defaultSession } from "@/types/session";
import { getServerSession } from "@/lib/sessionServerActions";
import { NextRequest } from "next/server";

const isValidWithBackend = async (authHeader: string | null) => {
  if (!authHeader) return false;

  const res = await fetch("http://localhost:8081/api/v1/user/getLoggedIn", {
    headers: {
      Authorization: authHeader,
    },
  });
  
  return res.ok;
};

// read session
export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  } else if (!(await isValidWithBackend(req.headers.get("Authorization")))) {
    session.destroy();
    return Response.json(defaultSession);
  }

  return Response.json(session, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
