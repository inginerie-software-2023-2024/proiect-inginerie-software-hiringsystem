import { NextRequest, NextResponse } from "next/server";

const removeSlot = async (slotId: string, authHeader: string) => {
  const res = fetch(`${process.env.BACKEND_URL}/api/v1/slot/delete/${slotId}`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
    },
  });

  return res;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const slotId = params.id;
  const authHeader = req.headers.get("Authorization");

  if (authHeader) return await removeSlot(slotId, authHeader);

  return new NextResponse("error");
}
