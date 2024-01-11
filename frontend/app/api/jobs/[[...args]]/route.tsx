import { NextRequest, NextResponse } from "next/server";

const getAllJobs = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/job/get/all`, {
    method: "GET",
  });

  return res;
};

const getJobById = async (id: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/job/get?id=${id}`,
    {
      method: "GET",
    }
  );

  return res;
};

const applyToJob = async (id: string, authorizationHeader: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/application/apply/${id}`,
    {
      method: "POST",
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );

  return res;
};

const deleteJob = async (id: string, authorizationHeader: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/job/delete?id=${id}`,
    {
      method: "POST",
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );

  return res;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { args: string[] } }
) {
  const args = params.args;
  if (args === undefined) return await getAllJobs();

  if (args.length > 1) {
    if (args[0] === "job") {
      return await getJobById(args[1]);
    }
  }

  return await getAllJobs();
}

export async function POST(
  req: NextRequest,
  { params }: { params: { args: string[] } }
) {
  const args = params.args;
  if (args.length > 1) {
    const authHeader = req.headers.get("Authorization");
    if (args[0] === "apply") {
      if (authHeader) return await applyToJob(args[1], authHeader);
      return new NextResponse("error");
    } else if (args[0] === "delete") {
      if (authHeader) return await deleteJob(args[1], authHeader);
      return new NextResponse("error");
    }
  }
}
