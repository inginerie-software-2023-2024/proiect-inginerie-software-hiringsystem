import { useContext, useDebugValue } from "react";
import AuthContext from "@/context/AuthProvider";



const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth.isLoggedIn ? "Authenticated" : "Not Authenticated");
    return useContext(AuthContext);
}

export default useAuth;