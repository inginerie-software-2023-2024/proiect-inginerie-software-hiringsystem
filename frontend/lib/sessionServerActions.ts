"use server";

import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "./session";
import { sleep } from "./utils";
import { jwtDecode } from "jwt-decode";
import { loginFormSchemaType } from "@/types/form/loginSchema";
import { registerFormSchemaType } from "@/types/form/registerSchema";
import axios from "axios";
import { axiosPrivate } from "@/lib/axiosPrivate";
import { RedirectType, redirect } from "next/navigation";

export async function getServerSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}

export async function destroySession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.destroy();
}

export async function logout() {
  // call backend logout here
  const successful = serverLogout();
  if (!successful) await destroySession();
  revalidatePath("/login");
}

const loginBackendData = async (payload: loginFormSchemaType) => {
  return await axios
    .post("http://localhost:8081/api/v1/auth/authenticate", payload)
    .then((apiResponse) => {
      const decoded = jwtDecode<{ userType: string }>(
        apiResponse.data.access_token
      );

      const session: SessionData = {
        isLoggedIn: true,
        accessToken: apiResponse.data.access_token,
        refreshToken: apiResponse.data.refresh_token,
        email: payload.email,
        roles: [decoded.userType],
      };
      return session;
    })
    .catch((error) => {
      // console.log(error)
      if (error.response.data.message) {
        return {
          errorMessage: error.response.data.message,
        };
      } else {
        return {
          errorMessage: "An error has occured.",
        };
      }
    });
};

export async function serverLogin(formData: loginFormSchemaType) {
  const session = await getServerSession();

  const requestedSession = await loginBackendData(formData);
  if ("errorMessage" in requestedSession) {
    return requestedSession;
  }

  session.accessToken = requestedSession.accessToken;
  session.refreshToken = requestedSession.refreshToken;
  session.email = requestedSession.email;
  session.roles = requestedSession.roles;
  session.isLoggedIn = true;

  await session.save();
  revalidatePath("/login");
}

export async function serverLogout() {
  const session = await getServerSession();
  if (session.isLoggedIn) {
    await axiosPrivate.post("http://localhost:8081/api/v1/auth/logout");
    session.destroy();
    revalidatePath("/login");
    return true;
  }

  return false;
}

export async function serverRegister(formData: registerFormSchemaType) {
  await axios.post("http://localhost:8081/api/v1/auth/register", formData);

  redirect("/register/sent", RedirectType.push);
}
