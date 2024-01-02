"use client"

import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import ForgotPasswordEmailBox from "@/components/auth/ForgotPasswordBox";

const ForgotPassword = () => {

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    if (token)
        return <ResetPasswordForm token={token} />

    return <ForgotPasswordEmailBox />
}

export default ForgotPassword;