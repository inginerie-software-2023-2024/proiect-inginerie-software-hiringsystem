import { NextRequest, NextResponse } from "next/server";

const getMyApplications = async (authorizationHeader: string) => {
  const res = await fetch(
    "http://localhost:8081/api/v1/interview/get/all/my",
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );

  return res;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { args: string[] } }
) {
  const args = params.args;
  if (args.length > 0) {
    if (args[0] === "me") {
      const authHeader = req.headers.get("Authorization");
      if (authHeader) return await getMyApplications(authHeader);
    }
  }

  return new NextResponse("error");
}
