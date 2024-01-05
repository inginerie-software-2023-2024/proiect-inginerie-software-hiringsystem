import { NextRequest, NextResponse } from "next/server";

const getMyInterviews = async (authorizationHeader: string) => {
  const res = await fetch("http://localhost:8081/api/v1/interview/get/all/my", {
    headers: {
      Authorization: authorizationHeader,
    },
  });

  return res;
};

const getInterview = async (id: string, authorizationHeader: string) => {
  const res1 = await fetch(
    `http://localhost:8081/api/v1/interview/getParticipantInfo/${id}`,
    {
      method: "POST",
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );

  if (!res1.ok) return new NextResponse(null, { status: res1.status });

  const res2 = await fetch(
    `http://localhost:8081/api/v1/interview/getUntilStart/${id}`,
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );

  return NextResponse.json({
    participantInfo: await res1.json(),
    untilStart: await res2.text(),
  });
};

const closeInterviewRoom = async (
  roomId: string,
  authorizationHeader: string
) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/interview/closeRoom/${roomId}`,
    {
      method: "POST",
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );

  return res;
};

const forceAction = async (
  roomId: string,
  userId: string,
  type: string,
  authorizationHeader: string
) => {
  const res = await fetch(
    `http://localhost:8081/api/v1/interview/forceAction/${roomId}/${userId}`,
    {
      method: "POST",
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
      }),
    }
  );

  return res;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { args: string[] } }
) {
  const args = params.args;
  const authHeader = req.headers.get("Authorization");
  if (args.length > 1) {
    if (args[0] === "interview") {
      if (authHeader) return await getInterview(args[1], authHeader);
    }
  } else if (args.length > 0) {
    if (args[0] === "me") {
      if (authHeader) return await getMyInterviews(authHeader);
    }
  }

  return new NextResponse("error");
}

export async function POST(
  req: NextRequest,
  { params }: { params: { args: string[] } }
) {
  const args = params.args;
  const authHeader = req.headers.get("Authorization");
  if (args.length > 2) {
    if (args[0] === "forceAction") {
      if (authHeader) {
        const payload = await req.json();
        return await forceAction(args[1], args[2], payload.type, authHeader);
      }
    }
  } else if (args.length > 1) {
    if (args[0] === "closeRoom") {
      if (authHeader) return await closeInterviewRoom(args[1], authHeader);
    }
  }

  return new NextResponse("error");
}
