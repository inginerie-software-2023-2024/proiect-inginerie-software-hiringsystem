"use client";

import React from "react";
import StatusButtons from "./StatusButtons";
import { TableRow, TableCell } from "../ui/table";
import { Badge } from "@/components/ui/badge";

const JobApplicationRow = ({ application, setCV }) => {
  const fetchCV = async () => {
    const res = await fetch(
      `http://localhost:3000/api/users/${application.candidate_user.id}/cv`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    setCV({ ...(await res.json()), user: application.candidate_user });
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        {`${application.candidate_user.firstName} ${application.candidate_user.lastName}`}
        <br />
        <span className="text-sm text-gray-500">
          {application.candidate_user.primaryEmail}
        </span>
      </TableCell>
      <TableCell>
        <Badge>{application.job_application.status}</Badge>
      </TableCell>
      <TableCell>{application.job_application.applicationDate}</TableCell>
      <StatusButtons application={application} />
      <TableCell>
        <button onClick={fetchCV} className="text-blue-500 hover:underline">
          View Resume
        </button>
      </TableCell>
    </TableRow>
  );
};

export default JobApplicationRow;
