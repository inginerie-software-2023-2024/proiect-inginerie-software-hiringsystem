"use client";

import JobForm from "@/components/jobs/form/JobForm";
import GenericLoading from "@/components/loading/GenericLoading";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const JobEdit = () => {
  const params = useParams<{ id: string }>();
  const { data: job, isLoading } = useSWR(
    `/api/jobs/job/${params.id}`,
    (url: string) => fetch(url).then((r) => r.json())
  );

  if (isLoading) return <GenericLoading />;

  return (
    <div className="m-auto max-w-2xl p-20 py-10 shadow-md">
      <h1 className="mb-5 text-2xl font-bold">Edit Job</h1>
      <JobForm job={job} />
    </div>
  );
};

export default JobEdit;
