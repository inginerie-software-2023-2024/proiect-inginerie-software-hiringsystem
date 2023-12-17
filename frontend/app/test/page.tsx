"use client";

import useAuth from "@/hooks/useAuth";
import React from "react";

const Test = () => {
  const { session: user, isLoading, logout } = useAuth();

  if (isLoading) return "Loading...";

  if (user.isLoggedIn)
    return (
      <div
        onClick={() => {
          logout();
        }}
      >
        Logout {user.email}
      </div>
    );

  return <div>Not logged</div>;
};

export default Test;
