import JobCard from "@/components/jobs/JobCard";
import React from "react";

async function getJobs() {
  const res = await fetch("http:/localhost:3000/api/jobs", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Jobs = async () => {
  const jobs = await getJobs();

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
