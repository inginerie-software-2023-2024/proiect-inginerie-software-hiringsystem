import { NextRequest, NextResponse } from "next/server";

const getCVById = async (id: string, authHeader: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/candidate/get/cv/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    }
  );

  return res;
};

const getCandidateProfileById = async (id: string, authHeader: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/candidate/profile/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    }
  );

  return res;
};

const getInterviewerProfileById = async (id: string, authHeader: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/interviewer/profile/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    }
  );

  return res;
};

const getManagerProfileById = async (id: string, authHeader: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/manager/profile/${id}`,
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
  { params: { id, type } }: { params: { id: string; type: string } }
) {
  const authHeader = req.headers.get("Authorization");
  if (authHeader) {
    if (type === "candidate") {
      const res1 = await getCandidateProfileById(id, authHeader);
      const userData = await res1.json();
      const res2 = await getCVById(userData.id, authHeader);
      const cvData = await res2.json();
      return NextResponse.json({
        user: userData,
        cv: cvData,
      });
    }
    else if (type === "interviewer") {
      return await getInterviewerProfileById(id, authHeader);
    }
    else if (type === "manager"){
      return await getManagerProfileById(id, authHeader);
    }
  }
  return new NextResponse("error");
}
