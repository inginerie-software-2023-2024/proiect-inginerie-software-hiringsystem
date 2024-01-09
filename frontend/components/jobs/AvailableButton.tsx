"use client";

import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

const checkApplication = async (toast: any, id: string) => {
  const res = await fetch(`http://localhost:3000/api/applications/check/${id}`);

  if (!res.ok) {
    // throw Error("Error fetching status of application.");
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Error fetching status of application.",
    });
    return;
  }

  return await res.text();
};

const apply = async (toast: any, id: string) => {
  const res = await fetch(`http://localhost:3000/api/jobs/apply/${id}`, {
    method: "POST",
  });

  if (!res.ok) {
    // throw Error("Error applying to job.");
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Error applying to job.",
    });
    return;
  }

  return await res.text();
};

const hasApplied = async (toast: any, id: string) => {
  const res = await checkApplication(toast, id);
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
  const { toast } = useToast();

  useEffect(() => {
    if (isLoadingUser || isLoading) return;

    hasApplied(toast, id).then((res) => setApplied(res));
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
          await apply(toast, id);
          setApplied(await hasApplied(toast, id));
          setLoading(false);
        }}
        className={className}
      >
        {isLoading ? "Applying..." : "Apply now"}
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
