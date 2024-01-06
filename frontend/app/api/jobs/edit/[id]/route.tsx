import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const payload = await req.json();
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return new Response("error");

  const res = await fetch(
    `http://localhost:8081/api/v1/job/edit?id=${params.id}`,
    {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return res;
}
