import AuthenticationTabs from "@/components/auth/AuthenticationTabs";
import { getServerSession } from "@/lib/sessionServerActions";
import React from "react";

const Login = async () => {
  const session = await getServerSession();

  if (session.isLoggedIn) return <div>Already logged in: {session.email}</div>;

  return <AuthenticationTabs defaultTab="login" />;
};

export default Login;
