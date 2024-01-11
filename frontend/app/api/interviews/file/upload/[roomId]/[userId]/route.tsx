import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { roomId: string; userId: string } }
) {
  const roomId = params.roomId;
  const userId = params.userId;
  const authHeader = req.headers.get("Authorization");

  if (authHeader) {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/v1/interview/files/upload/${roomId}/${userId}`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
        },
        body: await req.formData(),
      }
    );

    return res;
  }

  return new Response("error");
}
