"use client";

import { defaultSession } from "@/lib/session";
import useSWR from "swr";
import axios from "axios";

const sessionApiRoute = "/api/session";

export default function useClientSession() {
  const { data: session, isLoading } = useSWR(
    sessionApiRoute,
    (route) => axios.get(route).then((res) => res.data),
    {
      fallbackData: defaultSession,
    }
  );

  return { session, isLoading };
}
