import { NextRequest, NextResponse } from "next/server";

function addDaysAndSetHours(date, days, hours) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  result.setHours(hours);
  return result;
}

const getInterviewSlots = async (id: string, authHeader: string) => {
  const res = fetch(`http://localhost:8081/api/v1/slot/available/room/${id}`, {
    headers: {
      Authorization: authHeader,
    },
  });

  return res;
  // const dates = [
  //   new Date(),
  //   new Date(),
  //   new Date(),
  //   new Date(),
  //   new Date(),
  //   new Date(),
  // ];

  // dates[0] = addDaysAndSetHours(dates[0], 1, 12);
  // dates[1] = addDaysAndSetHours(dates[1], 1, 14);
  // dates[2] = addDaysAndSetHours(dates[2], 1, 18);
  // dates[3] = addDaysAndSetHours(dates[3], 2, 12);
  // dates[4] = addDaysAndSetHours(dates[4], 5, 12);
  // dates[5] = addDaysAndSetHours(dates[5], 12, 14);

  // return NextResponse.json({
  //   interview: {
  //     interviewerId: "interviewer",
  //     candidateId: "candidat",
  //   },
  //   slots: dates.map((date) => {
  //     return { date: date.toISOString(), durationInMinutes: 120 };
  //   }),
  // });
};

const scheduleSlot = async (slotId: string, roomId: string, authHeader: string) => {
  const res = fetch(
    `http://localhost:8081/api/v1/slot/schedule/${slotId}/${roomId}`,
    {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
    }
  );

  return res;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const authHeader = req.headers.get("Authorization");

  if (authHeader) return await getInterviewSlots(id, authHeader);

  return new NextResponse("error");
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const interviewId = params.id;
  const slotId = await req.json();
  const authHeader = req.headers.get("Authorization");

  if (authHeader) return await scheduleSlot(slotId, interviewId, authHeader);

  return new NextResponse("error");
}
