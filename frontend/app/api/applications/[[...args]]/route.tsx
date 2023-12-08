import { NextRequest, NextResponse } from "next/server";

const checkApplication = async (id: string, authorizationHeader: string) => {
  const res = await fetch(`http://localhost:8081/api/v1/application/check/${id}`,
  {
    headers: {
      Authorization: authorizationHeader
    }
  });

  if (!res.ok){
    throw Error("Error fetching status of application.");
  }

  return new NextResponse(await res.text());
}

const getAllApplications = async (id: string, authorizationHeader: string) => {
  const res = await fetch(`http://localhost:8081/api/v1/application/get/all/${id}`,
  {
    headers: {
      Authorization: authorizationHeader
    }
  });

  if (!res.ok){
    throw Error("Error fetching status of application.");
  }

  return NextResponse.json(await res.json());
}

export async function GET(
  req: NextRequest,
  { params }: { params: { args: string[] } }
) {
  const args = params.args;
  if (args.length > 1) {
    if (args[0] === "check") {
      const authHeader = req.headers.get("Authorization");
      if (authHeader)
        return await checkApplication(args[1], authHeader);
      return new NextResponse("error1");
    }
    else if(args[0] === "get") {
      const authHeader = req.headers.get("Authorization");
      if (authHeader)
        return await getAllApplications(args[1], authHeader);
      return new NextResponse("error3");
    }
  }

  return new NextResponse("error2");
}
