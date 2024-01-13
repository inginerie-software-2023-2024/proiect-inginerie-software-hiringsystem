import { NextResponse, NextRequest } from "next/server";

const getInterviewSlots = async (id: string, authHeader: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/slot/get/user/${id}`,
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
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const authHeader = req.headers.get("Authorization");

  if (authHeader) return await getInterviewSlots(id, authHeader);

  return new NextResponse("error");
}
