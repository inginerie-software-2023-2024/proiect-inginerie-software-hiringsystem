import { NextRequest, NextResponse } from "next/server";

const createCandidate = async (candidate: JSON, authHeader: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/manager/create/candidate`,
    {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(candidate),
    }
  );

  return res;
};

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const payload = await req.json();
  if (authHeader) return await createCandidate(payload, authHeader);
  return new NextResponse("error");
}
