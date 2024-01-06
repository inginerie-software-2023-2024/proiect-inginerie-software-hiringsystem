import JobCard from "@/components/jobs/JobCard";
import Link from "next/link";
import React from "react";

async function getJobs() {
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
  const jobs = await getJobs();

  return (
    <>
      <h1 className="my-7 flex items-center gap-5 self-center text-[2.7rem] font-bold">
        Available jobs
        <Link
          className="rounded bg-blue-3 p-4 text-[1.2rem] font-bold text-white hover:bg-blue-2"
          href="/jobs/create"
        >
          Create a job
        </Link>
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
