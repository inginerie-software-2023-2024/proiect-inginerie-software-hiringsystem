"use client";

import useSWR from "swr";
import "client-only";
import { SessionData, defaultSession } from "@/lib/session";
import useSWRMutation from "swr/mutation";
import { loginFormSchemaType } from "@/types/form/loginSchema";

function fetchJson<JSON = unknown>(
  urlAddition: string,
  input: string,
  init?: any
): Promise<JSON> {
  return fetch(`${input}${urlAddition}`, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  }).then((res) => res.json());
}

// facem uncurry pentru a returna fetchJson cu primul argument completat
// bind transforma functia din (urlAddition, input, init) in urlAddition => (input, init) dar si da valoare lui urlAddition
const fetchJsonCustomUrl = (urlAddition: string) =>
  (fetchJson<SessionData>).bind(null, urlAddition);

export default function useSession() {
  const { data: session, isLoading } = useSWR(
    "/api/auth",
    fetchJsonCustomUrl("/user"),
    {
      fallbackData: defaultSession,
    }
  );

  function doLogin(url: string, { arg }: { arg: loginFormSchemaType }) {
    return fetchJsonCustomUrl("/login")(url, {
      method: "POST",
      body: JSON.stringify(arg),
    });
  }

  function doLogout(url: string) {
    return fetchJsonCustomUrl("/logout")(url, {
      method: "POST",
    });
  }

  const { trigger: login } = useSWRMutation("/api/auth", doLogin, {
    revalidate: false,
  });
  const { trigger: logout } = useSWRMutation("/api/auth", doLogout);

  return { session, logout, login, isLoading };
}
