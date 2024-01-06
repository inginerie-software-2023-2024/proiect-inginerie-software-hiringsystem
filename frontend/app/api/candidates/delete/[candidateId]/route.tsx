import { NextRequest, NextResponse } from "next/server";

const deleteCandidate = async (candidateId: string, authHeader: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/candidate/delete/${candidateId}`,
    {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
    }
  );

  return res;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { candidateId: string } }
) {
  const authHeader = req.headers.get("Authorization");
  if (authHeader) return await deleteCandidate(params.candidateId, authHeader);
  return new NextResponse("error");
}
