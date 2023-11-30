"use client";

import useUser from "@/hooks/useUser";
import React, { useEffect } from "react";

const Test = () => {
  const { user, isLoading, logout } = useUser();

  if (isLoading)
    return "Loading..."

//   useEffect(() => {
//     console.log("S-A REFRESHUIT")
//   }, [user])

  if (user.isLoggedIn)
    return <div onClick={logout}>Logout {user.email}</div>

  return <div>Not logged</div>
};

export default Test;
