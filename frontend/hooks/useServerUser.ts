import { useEffect } from "react";
import useAuth from "./useAuth";
import { loginFormSchemaType } from "@/types/form/loginSchema";
import { serverLogin, serverLogout, serverRegister } from "@/lib/sessionServerActions";
import { registerFormSchemaType } from "@/types/form/registerSchema";

const useUser = () => {
    const {session} = await useServer;

    useEffect(() => {
        if (isLoading)
            return;

        setAuth(session);

    }, [session, isLoading, setAuth])

    const login = async (credentials : loginFormSchemaType) => {
        const error = await serverLogin(credentials);
        if (error)
            console.log(error);
    }

    const register = async (credentials : registerFormSchemaType) => {
        await serverRegister(credentials);
    }

    const logout = async () => {
        await serverLogout();
    }

    return  { user, login, register, logout }
}

export default useUser;