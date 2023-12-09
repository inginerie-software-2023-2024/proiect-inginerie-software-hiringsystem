import { NextRequest, NextResponse } from "next/server";

const getCVById = async (id: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/candidate/get/cv/${id}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return Response.json(await res.json());
};

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const authHeader = req.headers.get("Authorization");
  if (authHeader) return await getCVById(id);
  return new NextResponse("error");
}
