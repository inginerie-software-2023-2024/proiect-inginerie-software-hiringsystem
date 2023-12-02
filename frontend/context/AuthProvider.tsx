"use client";

import useSession from "@/hooks/useSession";
import React, { createContext } from "react";
import { SessionData } from "@/types/session";
import { TriggerWithArgs, TriggerWithoutArgs } from "swr/mutation";

export interface AuthObject {
  isLoggedIn: boolean;
  roles?: string[];
  email?: string;
}

interface AuthContextParams {
  session: SessionData;
  login: TriggerWithArgs<SessionData, any, any, any>;
  logout: TriggerWithoutArgs<SessionData, any, "/api/auth", never>;
  isLoading: boolean;
}

const AuthContext = createContext({} as AuthContextParams);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { session, login, logout, isLoading } = useSession();

  return (
    <AuthContext.Provider value={{ session, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
