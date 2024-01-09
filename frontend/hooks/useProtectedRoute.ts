"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { validateProtectedRoute } from "@/lib/protectRoutes";

export type DisplayState = "visible" | "login" | "forbidden";

const useProtectedRoute = () => {
  const { session, isLoading } = useAuth();
  const pathname = usePathname();
  const [displayState, setDisplayState] = useState<DisplayState>("visible");
  const [lastForbiddenMessage, setLastForbiddenMessage] = useState("");

  useEffect(() => {
    if (isLoading) return;

    validateProtectedRoute(pathname, async () => session).then(
      (routeOptions) => {
        if (!routeOptions) {
          setLastForbiddenMessage("");
          setDisplayState("visible");
          return;
        }

        if ("forbidden" in routeOptions) {
          setLastForbiddenMessage(routeOptions.forbiddenArgs);
          setDisplayState("forbidden");
          return;
        }

        setLastForbiddenMessage("");
        setDisplayState("login");
      }
    );
  }, [session, pathname]);

  return { displayState, lastForbiddenMessage };
};

export default useProtectedRoute;
