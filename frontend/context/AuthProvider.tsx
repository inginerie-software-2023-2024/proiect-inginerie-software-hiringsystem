"use client"

import React, { createContext, useState } from "react";

export interface AuthObject {
  isLoggedIn: boolean
  roles?: string[]
  email?: string
}

interface AuthContextProps {
  auth: AuthObject;
  setAuth: React.Dispatch<React.SetStateAction<AuthObject>>;
}

const AuthContext = createContext({auth: {isLoggedIn: false}} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth]  = useState<AuthObject>({isLoggedIn: false});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
