import { NextRequest, NextResponse } from "next/server";

const changePasswordBackendData = async (
  authHeader: string,
  payload: string
) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/user/change/password`,
    {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: payload,
    }
  );

  return res;
};

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const payload = await req.text();

  if (authHeader) return await changePasswordBackendData(authHeader, payload);
  return new NextResponse("error");
}
