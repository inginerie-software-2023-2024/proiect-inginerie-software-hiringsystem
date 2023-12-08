"use client";

import JobApplicationRow from "@/components/jobApplications/JobApplicationRow";
import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import React, { useState } from "react";
import useSWR from "swr";
import Link from "next/link";

const AllJobApplications = ({ params: { id } }: { params: { id: string } }) => {
  const { data: applications, isLoading } = useSWR(
    `/api/applications/get/${id}`,
    url => fetch(url).then(r => r.json())
  );
  const [cv, setCV] = useState();

  if (isLoading) return "Loading...";

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Resume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => {
              return (
                <JobApplicationRow
                  key={application.id}
                  application={application}
                  setCV={setCV}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  //   return (
  //     <div>
  //       {applications.map((application) => {
  //         return (
  //           <JobApplicationRow application={application} key={application.id} />
  //         );
  //       })}
  //     </div>
  //   );
};

export default AllJobApplications;
