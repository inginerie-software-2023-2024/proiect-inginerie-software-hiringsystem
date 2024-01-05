"use client";

import Forbidden from "@/app/forbidden/page";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProtectedFrame = ({ children }: { children: React.ReactNode }) => {
  const { displayState, lastForbiddenMessage } = useProtectedRoute();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (displayState === "login") {
      router.push(`/login?callback=${pathname}`);
    }
  }, [displayState]);

  if (displayState === "forbidden")
    return <Forbidden lastForbiddenMessage={lastForbiddenMessage} />;

  return <>{children}</>;
};

export default ProtectedFrame;
