import { NextRequest, NextResponse } from "next/server";

const checkApplication = async (id: string, authorizationHeader: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/application/check/${id}`,
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );

  return res;
};

const getAllApplications = async (id: string, authorizationHeader: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/application/get/all/${id}`,
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );

  return res;
};

const updateStatusApplication = async (
  id: string,
  status: string,
  authorizationHeader: string
) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/application/status/update/${status}/${id}`,
    {
      method: "POST",
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );

  return res;
};

const eraseApplication = async (id: string, authorizationHeader: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/application/erase?id=${id}`,
    {
      method: "POST",
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );

  return res;
};

const withdrawApplication = async (id: string, authorizationHeader: string) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/application/withdraw?id=${id}`,
    {
      method: "POST",
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );

  return res;
};

const getMyApplications = async (authorizationHeader: string) => {
  const res = await fetch(
    "http://localhost:8081/api/v1/application/get/all/my",
    {
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
  if (args.length > 1) {
    if (args[0] === "check") {
      const authHeader = req.headers.get("Authorization");
      if (authHeader) return await checkApplication(args[1], authHeader);
      return new NextResponse("error1");
    } else if (args[0] === "get") {
      const authHeader = req.headers.get("Authorization");
      if (authHeader) return await getAllApplications(args[1], authHeader);
      return new NextResponse("error3");
    }
  } else if (args.length > 0) {
    if (args[0] === "me") {
      const authHeader = req.headers.get("Authorization");
      if (authHeader) return await getMyApplications(authHeader);
    }
  }

  return new NextResponse("error2");
}

export async function POST(
  req: NextRequest,
  { params }: { params: { args: string[] } }
) {
  const args = params.args;
  if (args.length > 1) {
    const authHeader = req.headers.get("Authorization");
    if (args[0] === "accept") {
      if (authHeader)
        return await updateStatusApplication(args[1], "ACCEPTED", authHeader);
      return new NextResponse("error1");
    } else if (args[0] === "reject") {
      if (authHeader)
        return await updateStatusApplication(args[1], "REJECTED", authHeader);
      return new NextResponse("error2");
    } else if (args[0] === "erase") {
      if (authHeader) return await eraseApplication(args[1], authHeader);
      return new NextResponse("error3");
    } else if (args[0] === "withdraw") {
      if (authHeader) return await withdrawApplication(args[1], authHeader);
      return new NextResponse("error4");
    }
  }

  return new NextResponse("error5");
}
