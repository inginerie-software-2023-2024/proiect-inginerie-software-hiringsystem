import { NextRequest } from "next/server";

const sendResetPasswordEmail = async (email: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/auth/forgot/password`,
    {
      method: "POST",
      body: email,
    }
  );

  return res;
};

const resetPassword = async (token: string, password: string) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/v1/auth/reset/password/${token}`,
    {
      method: "POST",
      body: password,
    }
  );

  return res;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { args: string[] } }
) {
  const args = params.args;

  if (!args) {
    const payload = await req.json();
    return await sendResetPasswordEmail(payload);
  } else {
    const payload = await req.json();
    return await resetPassword(args[0], payload);
  }
}
