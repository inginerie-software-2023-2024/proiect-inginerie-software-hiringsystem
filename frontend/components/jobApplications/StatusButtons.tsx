"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { TableCell } from "../ui/table";
import { mutate } from "swr";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

const accept = async (application) => {
  const res = await fetch(
    `http://localhost:3000/api/applications/accept/${application.id}`,
    {
      method: "POST",
    }
  );

  if (res.ok) {
    await mutate(`/api/applications/get/${application.jobId}`);
  }

  return await res.text();
};

const reject = async (application) => {
  const res = await fetch(
    `http://localhost:3000/api/applications/reject/${application.id}`,
    {
      method: "POST",
    }
  );

  if (res.ok) {
    await mutate(`/api/applications/get/${application.jobId}`);
  }

  return await res.text();
};

const erase = async (application) => {
  const res = await fetch(
    `http://localhost:3000/api/applications/erase/${application.id}`,
    {
      method: "POST",
    }
  );

  if (res.ok) {
    await mutate(`/api/applications/get/${application.jobId}`);
  }

  return await res.text();
};

const StatusButtons = ({ application }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <TableCell className="flex items-center gap-5">
      {isLoading && <LoadingSpinner />}
      <div
        className="inline-flex [&>*:first-child]:rounded-s-lg [&>*:last-child]:rounded-e-lg"
        role="group"
      >
        {application.job_application.status === "SUBMITTED" && (
          <>
            <Button
              disabled={isLoading}
              className="bg-green-500 text-white"
              onClick={async () => {
                setLoading(true);
                await accept(application.job_application);
                setLoading(false);
              }}
            >
              Accept
            </Button>
            <Button
              disabled={isLoading}
              className="bg-red-500 text-white"
              onClick={async () => {
                setLoading(true);
                await reject(application.job_application);
                setLoading(false);
              }}
            >
              Reject
            </Button>
            <Button
              disabled={isLoading}
              className="bg-gray-400 text-white"
              onClick={async () => {
                setLoading(true);
                await erase(application.job_application);
                setLoading(false);
              }}
            >
              Erase
            </Button>
          </>
        )}
      </div>
    </TableCell>
  );
};

export default StatusButtons;
