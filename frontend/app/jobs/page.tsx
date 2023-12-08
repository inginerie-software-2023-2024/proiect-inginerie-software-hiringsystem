import JobCard from "@/components/jobs/JobCard";
import { cookies } from "next/headers";
import React, { cache } from "react";

async function getJobs(cookies) {
  console.log(cookies);
  const res = await fetch("http:/localhost:3000/api/jobs", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

const Jobs = async () => {
  const jobs = await getJobs(cookies());

  return (
    <>
      <h1 className="my-7 self-center text-[2.7rem] font-bold">
        Available jobs
      </h1>
      <div className="flex flex-col items-center gap-10 self-center pb-[50px]">
        {jobs.map((job, index) => {
          return <JobCard job={job} key={index} />;
        })}
      </div>
    </>
  );
};

export default Jobs;
