"use client";

import useAuth from "@/hooks/useAuth";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const DeleteButton = ({ className = "" }) => {
  const { session } = useAuth();
  const params = useParams<{ id: string }>();

  if (!session?.roles?.includes("manager")) return null;

  return (
    <>
      <Link href={`${params.id}/edit`} className={className}>
        Edit Job
      </Link>
    </>
  );
};

export default DeleteButton;
