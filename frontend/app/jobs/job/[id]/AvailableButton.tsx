"use client";

import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const checkApplication = async (id: string) => {
  //"use server"

  const res = await fetch(
    `http://localhost:3000/api/applications/check/${id}`,
    // {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // }
  );

  console.log("TEST");
 // debugger;
  if (!res.ok) {
    throw Error("Error fetching status of application.");
  }

  return await res.text();
};

const hasApplied = async (id: string) => {
  const res = await checkApplication(id);
  return res === "true";
};

export const AvailableButton = ({
  id,
  className,
}: {
  id: string;
  className: string;
}) => {
  const { session: user, isLoading } = useAuth();
  const [applied, setApplied] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    hasApplied(id).then((res) => setApplied(res));
  }, [id, user, isLoading]);

  if (!user.isLoggedIn) return null;

  if (user.roles?.includes("candidate")) {
    if (applied)
      return (
        <span className="absolute bottom-2 right-9 italic">
          You have applied to this job.
        </span>
      );

    return (
      <Link href="apply" className={className}>
        Apply now
      </Link>
    );
  }

  if (user.roles?.includes("interviewer") || user.roles?.includes("manager")) {
    return (
      <Link href="applications" className={cn(className, "bg-red-700")}>
        View all applications
      </Link>
    );
  }

  return null;
};
