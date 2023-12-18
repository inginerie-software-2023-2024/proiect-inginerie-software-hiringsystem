"use client";

import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const checkApplication = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/applications/check/${id}`);

  if (!res.ok) {
    throw Error("Error fetching status of application.");
  }

  return await res.text();
};

const apply = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/jobs/apply/${id}`, {
    method: "POST",
  });

  if (!res.ok) {
    throw Error("Error applying to job.");
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
  const { session: user, isLoading: isLoadingUser } = useAuth();
  const [applied, setApplied] = useState(true);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoadingUser || isLoading) return;

    hasApplied(id).then((res) => setApplied(res));
  }, [id, user, isLoadingUser, isLoading]);

  if (!user.isLoggedIn) return null;

  if (user.roles?.includes("candidate")) {
    if (applied)
      return (
        <span className="absolute bottom-2 right-9 italic">
          You have applied to this job.
        </span>
      );

    return (
      <button
        disabled={isLoading}
        onClick={async () => {
          setLoading(true);
          await apply(id);
          setApplied(await hasApplied(id));
          setLoading(false);
        }}
        className={className}
      >
        {isLoading?"Applying...":"Apply now"}
      </button>
    );
  }

  if (user.roles?.includes("interviewer") || user.roles?.includes("manager")) {
    return (
      <Link href={`${id}/applications`} className={cn(className, "bg-red-700")}>
        View all applications
      </Link>
    );
  }

  return null;
};
