import { CANDIDATES_PAGE_SIZE } from "@/constants/management";
import { NextRequest, NextResponse } from "next/server";

const getPage = async (page: number, authHeader: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/candidate/get/all/paginated?page=${page}&size=${CANDIDATES_PAGE_SIZE}`,
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
  { params }: { params: { page: string } }
) {
  const authHeader = req.headers.get("Authorization");
  const page = parseInt(params.page) || 1;
  if (authHeader) return await getPage(page, authHeader);
  return new NextResponse("error");
}
