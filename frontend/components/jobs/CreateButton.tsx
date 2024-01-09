"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React from "react";

const CreateButton = () => {
  const { session } = useAuth();

  if (!session.roles?.includes("manager")) return null;

  return (
    <Link
      className="rounded bg-blue-3 p-4 text-[1.2rem] font-bold text-white hover:bg-blue-2"
      href="/jobs/create"
    >
      Create a job
    </Link>
  );
};

export default CreateButton;
