import { NextRequest } from "next/server";

const getAllJobs = async () => {
  const res = await fetch("http://localhost:8081/api/v1/job/get/all", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return Response.json(await res.json());
};

const getJobById = async (id: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/job/get?id=${id}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return Response.json(await res.json());
};

// read session
export async function GET(
  req: NextRequest,
  { params }: { params: { jobs: string[] } }
) {
  const jobs = params.jobs;
  if (jobs.length > 2) {
    if (jobs[1] === "job") {
      return getJobById(jobs[2]);
    }
  }

  return await getAllJobs();
}
