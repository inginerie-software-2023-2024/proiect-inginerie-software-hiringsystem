import React from 'react'
import useAuth from './useAuth';
import axios from '@/lib/axios';

const useLogin = () => {
    const { setAuth } = useAuth();

    const login = async ({user, pwd} : {user: string, pwd: string}) => {
        try {
            const response = await axios.post("/api/v1/auth/authenticate",
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            //setAuth({ user, pwd, roles, accessToken });
            //resetUser();
            //setPwd('');
           // navigate(from, { replace: true });
        } catch (err) {
            // if (!err?.response) {
            //     setErrMsg('No Server Response');
            // } else if (err.response?.status === 400) {
            //     setErrMsg('Missing Username or Password');
            // } else if (err.response?.status === 401) {
            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg('Login Failed');
            // }
            // errRef.current.focus();
        }
    }

    return login;
}

export default useLogin