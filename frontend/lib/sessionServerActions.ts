"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "./session";
import { registerFormSchemaType } from "@/types/form/registerSchema";
import axios from "axios";
import { RedirectType, redirect } from "next/navigation";

export async function getServerSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}

export async function serverRegister(formData: registerFormSchemaType) {
  await axios.post("http://localhost:8081/api/v1/auth/register", formData);

  redirect("/register/sent", RedirectType.push);
}
