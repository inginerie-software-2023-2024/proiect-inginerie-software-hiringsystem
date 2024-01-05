import { CANDIDATES_PAGE_SIZE } from "@/constants/management";
import { NextRequest, NextResponse } from "next/server";

const getPages = async (authHeader: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/candidate/get/pages?size=${CANDIDATES_PAGE_SIZE}`,
    {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    }
  );

  return res;
};

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (authHeader) return await getPages(authHeader);
  return new NextResponse("error");
}
