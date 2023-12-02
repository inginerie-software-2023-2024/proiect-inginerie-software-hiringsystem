"use server";
import "server-only";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "../types/session";
import { registerFormSchemaType } from "@/types/form/registerSchema";
import axios from "axios";
import { RedirectType, redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export async function getServerSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}

export async function refreshTokenGetSession() {
  const session = await getServerSession();

  if (session.refreshToken && session.accessTokenExpireDate) {
    if (session.accessTokenExpireDate < new Date().getTime()) {
      console.log("expirat");
      const newToken = await getNewAccessToken(session.refreshToken);
      if (newToken) {
        session.accessToken = newToken;
        const decoded = jwtDecode<{ userType: string; exp: number }>(newToken);
        session.accessTokenExpireDate = decoded.exp * 1000;
        session.roles = [decoded.userType];
      } else {
        session.destroy();
        return getServerSession();
      }

      await session.save();
      return session;
    }
  }

  return session;
}

async function getNewAccessToken(refreshToken: string) {
  const response = await fetch(
    "http://localhost:8081/api/v1/auth/refresh-token",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  const data = await response.json();
  if (response.ok) return data.access_token;

  return false;
}

export async function serverRegister(formData: registerFormSchemaType) {
  await axios.post("http://localhost:8081/api/v1/auth/register", formData);

  redirect("/register/sent", RedirectType.push);
}
