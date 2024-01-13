import { NextRequest, NextResponse } from "next/server";

const getDetailsByEmail = async (email: string, authHeader: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/user/details/${email}/short`,
    {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    }
  );

  return res;
};

export async function GET(
  req: NextRequest,
  { params: { email } }: { params: { email: string } }
) {
  const authHeader = req.headers.get("Authorization");
  if (authHeader) return await getDetailsByEmail(email, authHeader);
  return new NextResponse("error");
}
