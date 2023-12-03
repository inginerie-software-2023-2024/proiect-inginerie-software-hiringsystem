import Link from "next/link";
import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="flex w-[70vw] flex-col gap-3 bg-gray-100 p-7 shadow-lg">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <span>
          Position: <b>{job.position}</b>
        </span>
      </div>
      <p className="p-5 text-justify">{job.description}</p>
      <Link href={`/jobs/job/${job.id}`} className="self-end rounded-md bg-blue-2 p-3 font-bold text-white">
        View job
      </Link>
    </div>
  );
};

export default JobCard;
