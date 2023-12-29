import { NextRequest, NextResponse } from "next/server";

async function createInterview(payload: any, authHeader: string) {
  const res = await fetch("http://localhost:8081/api/v1/interview/create", {
    method: "POST",
    headers: {
      Authorization: authHeader,
    },
    body: JSON.stringify(payload),
  });

  return res;
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const payload = await req.json();
  if (authHeader) return await createInterview(payload, authHeader);

  return new NextResponse("error");
}
