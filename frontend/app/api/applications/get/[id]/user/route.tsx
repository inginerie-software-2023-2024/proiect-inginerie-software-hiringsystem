import { NextRequest, NextResponse } from "next/server";

const getUser = async (applicationId: string, authHeader: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/application/get/${applicationId}/user`,
    {
      headers: {
        Authorization: authHeader,
      },
    }
  );

  return res;
};

export async function GET(
  req: NextRequest,
  { params: { id: applicationId } }: { params: { id: string } }
) {
  const authHeader = req.headers.get("Authorization");
  if (authHeader) return await getUser(applicationId, authHeader);

  return new NextResponse("error");
}
