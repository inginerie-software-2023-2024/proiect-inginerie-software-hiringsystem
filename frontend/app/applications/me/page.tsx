"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import React from "react";
import useSWR from "swr";

const MyApplicationsRow = ({ application }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{application.job.title}</TableCell>
      <TableCell>
        {formatDate(application.job_application.applicationDate)}
      </TableCell>
      <TableCell>
        <Badge>{application.job_application.status}</Badge>
      </TableCell>
      <TableCell>
        {application.job_application.status !== "SUBMITTED" ? (
          <h1>Can{"'"}t withdraw</h1>
        ) : (
          <Button className="border-red-500 text-red-500" variant="outline">
            Withdraw
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

const MyApplications = () => {
  const { data: applications, isLoading } = useSWR(
    "/api/applications/me",
    (url) => fetch(url).then((r) => r.json())
  );

  if (isLoading) return "Loading...";

  return (
    <>
      <h1 className="my-5 self-center text-[2.7rem] font-bold">
        My Applications
      </h1>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Job Title</TableHead>
                <TableHead className="w-[150px]">Applied Date</TableHead>
                <TableHead className="w-[150px]">Application Status</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => {
                return (
                  <MyApplicationsRow
                    application={application}
                    key={application.job_application.id}
                  />
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default MyApplications;
