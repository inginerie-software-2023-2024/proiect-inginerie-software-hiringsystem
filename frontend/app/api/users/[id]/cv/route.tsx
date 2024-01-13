import { NextRequest, NextResponse } from "next/server";

const getCVById = async (id: string, authHeader: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/candidate/get/cv/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    }
  );

  return res;
};

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const authHeader = req.headers.get("Authorization");
  if (authHeader) return await getCVById(id, authHeader);
  return new NextResponse("error");
}
