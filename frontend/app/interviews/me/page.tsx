"use client";

import GenericLoading from "@/components/loading/GenericLoading";
import { Badge } from "@/components/ui/badge";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const StartOfInterview = ({ startDate, interviewId }) => {
  const { session } = useAuth();
  const canSelectSlot = session.roles?.includes("candidate");

  if (startDate)
    return <TableCell>{formatDateTime(new Date(startDate))}</TableCell>;

  return (
    <TableCell>
      {canSelectSlot ? (
        <Link
          href={`/interviews/schedule/${interviewId}`}
          className="rounded bg-green-500 p-4 font-bold text-white hover:bg-green-400"
        >
          Select a slot
        </Link>
      ) : (
        <p className="font-bold text-muted-foreground">
          Waiting for candidate to select slot.
        </p>
      )}
    </TableCell>
  );
};

const MyInterviewsRow = ({ interview }) => {
  return (
    <TableRow>
      <TableCell>{formatDateTime(new Date(interview.creationDate))}</TableCell>
      <StartOfInterview
        startDate={interview.startDate}
        interviewId={interview.id}
      />
      <TableCell>
        <Badge>{interview.participants.length}</Badge>
      </TableCell>
      <TableCell>
        <Link
          href={`/interviews/room/${interview.id}`}
          className="rounded bg-blue-4 p-3 font-bold text-white"
        >
          Go to interview
        </Link>
      </TableCell>
    </TableRow>
  );
};

const MyInterviews = () => {
  const { data: interviews, isLoading } = useSWR("/api/interviews/me", (url) =>
    fetch(url).then((r) => r.json())
  );

  if (isLoading) return <GenericLoading />;

  return (
    <>
      <h1 className="my-5 self-center text-[2.7rem] font-bold">
        My Interviews
      </h1>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Created on</TableHead>
                <TableHead className="w-[150px]">Starts at</TableHead>
                <TableHead className="w-[150px]">Participants</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews.map((interview) => {
                return (
                  <MyInterviewsRow interview={interview} key={interview.id} />
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default MyInterviews;
