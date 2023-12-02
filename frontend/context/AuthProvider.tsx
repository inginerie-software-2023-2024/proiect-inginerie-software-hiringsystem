"use client";

import useSession from "@/hooks/useSession";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface AuthObject {
  isLoggedIn: boolean;
  roles?: string[];
  email?: string;
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { session, login, logout, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("TRIGGER")
    console.log(session)
    if (session.isLoggedIn) return;

    router.refresh();
  }, [session, router]);

  return (
    <AuthContext.Provider value={{ session, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
