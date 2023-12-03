import React from "react";

async function getJob(id: string) {
  const res = await fetch(`http:/localhost:3000/api/jobs/job/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const JobView = async ({ params: { id } }: { params: { id: string } }) => {
  const job = await getJob(id);
  return <div>{JSON.stringify(job)}</div>;
};

export default JobView;
