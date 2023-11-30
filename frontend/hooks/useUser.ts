import { useEffect } from "react";
import useAuth from "./useAuth";
import useClientSession from "./useClientSession";
import { loginFormSchemaType } from "@/types/form/loginSchema";
import {
  serverLogin,
  serverLogout,
  serverRegister,
} from "@/lib/sessionServerActions";
import { registerFormSchemaType } from "@/types/form/registerSchema";

const useUser = () => {
  const { auth: user, setAuth } = useAuth();
  const { session, isLoading } = useClientSession();

  useEffect(() => {
    if (isLoading) return;
    console.log(isLoading)

    setAuth(session);
  }, [session, isLoading, setAuth]);

  const login = async (credentials: loginFormSchemaType) => {
    const error = await serverLogin(credentials);
    if (error) console.log(error);
  };

  const register = async (credentials: registerFormSchemaType) => {
    await serverRegister(credentials);
  };

  const logout = async () => {
    await serverLogout();
    setAuth({ isLoggedIn: false });
  };

  return { user, isLoading, login, register, logout };
};

export default useUser;
