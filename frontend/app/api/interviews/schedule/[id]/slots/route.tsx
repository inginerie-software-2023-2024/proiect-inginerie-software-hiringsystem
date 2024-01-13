import { NextRequest, NextResponse } from "next/server";

const getInterviewSlots = async (id: string, authHeader: string) => {
  const res = fetch(
    `${process.env.BACKEND_URL}/api/v1/slot/available/room/${id}`,
    {
      headers: {
        Authorization: authHeader,
      },
    }
  );

  return res;
};

const scheduleSlot = async (
  slotId: string,
  roomId: string,
  authHeader: string
) => {
  const res = fetch(
    `${process.env.BACKEND_URL}/api/v1/slot/schedule/${slotId}/${roomId}`,
    {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
    }
  );

  return res;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const authHeader = req.headers.get("Authorization");

  if (authHeader) return await getInterviewSlots(id, authHeader);

  return new NextResponse("error");
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const interviewId = params.id;
  const slotId = await req.json();
  const authHeader = req.headers.get("Authorization");

  if (authHeader) return await scheduleSlot(slotId, interviewId, authHeader);

  return new NextResponse("error");
}
