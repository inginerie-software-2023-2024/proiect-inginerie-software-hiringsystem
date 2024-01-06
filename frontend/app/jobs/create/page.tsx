import JobForm from "@/components/jobs/form/JobForm";
import React from "react";

const JobCreate = () => {
  return (
    <div className="m-auto max-w-2xl p-20 py-10 shadow-md">
      <h1 className="mb-5 text-2xl font-bold">Create Job</h1>
      <JobForm />
    </div>
  );
};

export default JobCreate;
