"use client";

import GenericLoading from "@/components/loading/GenericLoading";
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
import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/lib/utils";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";

const withdrawApplication = async (toast: any, id: string) => {
  const res = await fetch(
    `http://localhost:3000/api/applications/withdraw/${id}`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    // throw Error("Could not withdraw application");
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Could not withdraw application.",
    });
    return;
  }

  return await res.text();
};

const MyApplicationsRow = ({ application }) => {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

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
          <Button
            disabled={isLoading}
            onClick={async () => {
              setLoading(true);
              await withdrawApplication(toast, application.job_application.id);
              mutate("/api/applications/me");
              setLoading(false);
            }}
            className="border-red-500 text-red-500"
            variant="outline"
          >
            {isLoading ? "Withdrawing..." : "Withdraw"}
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

  if (isLoading) return <GenericLoading />;

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
              {applications?.map((application) => {
                return (
                  <MyApplicationsRow
                    application={application}
                    key={application.job_application.id}
                  />
                );
              })}
              {applications?.length === 0 && (
                <h1 className="my-5 text-center">No applications found.</h1>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default MyApplications;
