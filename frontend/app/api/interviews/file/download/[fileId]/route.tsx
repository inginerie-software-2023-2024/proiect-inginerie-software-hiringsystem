import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { fileId: string } }
) {
  const fileId = params.fileId;
  const authHeader = req.headers.get("Authorization");

  if (authHeader) {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/v1/interview/files/download/${fileId}`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return res;
  }

  return new NextResponse("error");
}
