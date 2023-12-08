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
  const res = await fetch(`http://localhost:8081/api/v1/job/get?id=${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return Response.json(await res.json());
};

export async function GET(
  req: NextRequest,
  { params }: { params: { args: string[] } }
) {
  const args = params.args;
  if (args === undefined)
    return await getAllJobs();

  if (args.length > 1) {
    if (args[0] === "job") {
      return await getJobById(args[1]);
    }
  }

  return await getAllJobs();
}
