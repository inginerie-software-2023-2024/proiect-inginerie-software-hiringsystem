"use server";
import "server-only";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "../types/session";
import { registerFormSchemaType } from "@/types/form/registerSchema";
import { RedirectType, redirect } from "next/navigation";

export async function getServerSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}

export async function serverRegister(formData: registerFormSchemaType) {
  const res = await fetch("http://localhost:8081/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (res.ok) redirect("/register/sent", RedirectType.push);
  else{
    const data = await res.json();
    return data;
  }
}
