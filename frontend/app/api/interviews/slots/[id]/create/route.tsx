import { NextRequest, NextResponse } from "next/server";

const addSlot = async (
  slot: JSON,
  interviewerId: string,
  authHeader: string
) => {
  const res = fetch(`${process.env.BACKEND_URL}/api/v1/slot/create`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...slot, userId: interviewerId }),
  });

  return res;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const interviewerId = params.id;
  const payload = await req.json();
  const authHeader = req.headers.get("Authorization");

  if (authHeader) return await addSlot(payload, interviewerId, authHeader);

  return new NextResponse("error");
}
