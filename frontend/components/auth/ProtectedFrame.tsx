"use client";
import Login from "@/app/(auth)/login/page";
import Forbidden from "@/app/forbidden/page";
import useAuth from "@/hooks/useAuth";
import { validateProtectedRoute } from "@/lib/protectRoutes";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// eslint-disable-next-line no-unused-vars
enum DisplayState {
  // eslint-disable-next-line no-unused-vars
  VISIBLE,
  // eslint-disable-next-line no-unused-vars
  FORBIDDEN,
  // eslint-disable-next-line no-unused-vars
  LOGIN,
}

const ProtectedFrame = ({ children }: { children: React.ReactNode }) => {
  const { session, isLoading } = useAuth();
  const pathname = usePathname();
  const [displayState, setDisplayState] = useState(DisplayState.VISIBLE);
  const [lastForbiddenMessage, setLastForbiddenMessage] = useState("");

  useEffect(() => {
    if (isLoading) return;

    const validate = async () => {
      const routeOptions = await validateProtectedRoute(
        pathname,
        async () => session
      );
      if (!routeOptions) {
        setDisplayState(DisplayState.VISIBLE);
        return;
      }

      if ("forbidden" in routeOptions) {
        setLastForbiddenMessage(routeOptions.forbiddenArgs);
        setDisplayState(DisplayState.FORBIDDEN);
        return;
      }

      setDisplayState(DisplayState.LOGIN);
    };

    validate();
  }, [session, pathname, isLoading]);

  if (displayState === DisplayState.FORBIDDEN)
    return <Forbidden lastForbiddenMessage={lastForbiddenMessage} />;
  if (displayState === DisplayState.LOGIN) return <Login />;

  return <>{children}</>;
};

export default ProtectedFrame;
