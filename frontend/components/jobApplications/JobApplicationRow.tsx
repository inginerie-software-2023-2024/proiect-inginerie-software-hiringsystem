import React from "react";
import StatusButtons from "./StatusButtons";
import { Button } from "../ui/button";
import { TableRow, TableCell } from "../ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const JobApplicationRow = ({ application, setCV }) => {
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
        <Badge>
          {application.job_application.status}
        </Badge>
      </TableCell>
      <TableCell>{application.job_application.applicationDate}</TableCell>
      <StatusButtons application={application} />
      <TableCell>
        <Link
          className="text-blue-500 hover:underline"
          href="#"
          target="_blank"
        >
          View Resume
        </Link>
      </TableCell>
    </TableRow>
  );
  // return (
  //   <div>
  //     <StatusButtons application={application} />

  //     <div>
  //       {`${application.candidate_user.firstName} ${application.candidate_user.lastName}`}
  //     </div>
  //     <div>{application.candidate_user.primaryEmail}</div>
  //     <div>{application.job_application.applicationDate}</div>
  //     <div>{application.job_application.status}</div>

  //     <button
  //       onClick={() => setCV(application.candidate_user.id)}
  //       className="btn btn-primary"
  //     >
  //       View CV
  //     </button>
  //   </div>
  // );
};

export default JobApplicationRow;
