import { NextRequest } from "next/server";

const sendResetPasswordEmail = async (email: string) => {
    const res = await fetch(
      `http://localhost:8081/api/v1/auth/forgot/password`,
      {
        method: "POST",
        body: email,
      }
    );
  
    return res;
  };

export async function POST(
    req: NextRequest
  ) {
        const payload = await req.text();

        return await sendResetPasswordEmail(payload);
  }