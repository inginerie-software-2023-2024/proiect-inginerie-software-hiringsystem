"use server";

import React from "react";
import { AvailableButton } from "@/components/jobs/AvailableButton";
import DeleteButton from "@/components/jobs/DeleteButton";
import EditButton from "@/components/jobs/EditButton";

async function getJob(id: string) {
  const res = await fetch(`http:/localhost:3000/api/jobs/job/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

const JobView = async ({ params: { id } }: { params: { id: string } }) => {
  const job = await getJob(id);

  return (
    <section className="relative flex w-[80vw] flex-1 flex-col justify-around gap-[20px] self-center bg-slate-100 p-5">
      <h1 className="self-center text-[2.7rem] font-bold">{job.title}</h1>
      <div className="flex justify-around">
        <span>
          Position: <b>{job.position}</b>
        </span>
        <span>
          Job Type: <b>{job.jobType}</b>
        </span>
      </div>
      <div className="flex flex-col gap-5 p-10">
        <h1 className="text-lg font-bold">
          A few words about this job and our team:
        </h1>
        <p className="px-5 text-justify">{job.description}</p>
      </div>
      <div className="flex justify-around gap-5 px-7">
        <div className="flex flex-col gap-2 rounded bg-white p-7 shadow-sm">
          <h1 className="text-lg font-bold">Skills Needed</h1>
          <ul className="list-none">
            {job.skillsNeeded.map((skill, index) => {
              return <li key={index}>&#x2713; {skill}</li>;
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-2 rounded bg-white p-7 shadow-sm">
          <h1 className="text-lg font-bold">Our Offers</h1>
          <ul className="list-none">
            {job.offers.map((offer, index) => {
              return <li key={index}>&#x2713; {offer}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className="relative flex flex-col gap-5 px-7">
        <h1 className="text-lg font-bold">Some other important details:</h1>
        <ul className="list-disc px-9">
          <li>
            <b>Start date:</b> {job.startDate}
          </li>
          <li>
            <b>Expected salary:</b> {job.salary}
          </li>
          <li>
            <b>Hours per week:</b> {job.hoursPerWeek}
          </li>
        </ul>
        <AvailableButton
          id={id}
          className="absolute bottom-2 right-9 rounded bg-blue-5 p-3 font-bold text-white"
        />
      </div>
      <DeleteButton className="absolute right-9 top-2 rounded bg-red-600 font-bold text-white" />
      <EditButton className="absolute left-9 top-2 rounded bg-gray-600 p-2 font-bold text-white" />
    </section>
  );
};

export default JobView;
