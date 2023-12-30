"use client";

import InterviewRoom from "@/components/interview/InterviewRoom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useInterview from "@/hooks/useInterview";
import Link from "next/link";
import React from "react";

const SelectASlot = ({ interviewId }: { interviewId: string }) => {
  return (
    <Card className="m-auto flex flex-col self-center p-10">
      <CardHeader>
        <CardTitle>Interview not scheduled yet</CardTitle>
        <CardDescription>
          The interview does not have a selected slot yet.
        </CardDescription>
      </CardHeader>
      <Link
        href={`/interviews/schedule/${interviewId}`}
        className="rounded bg-blue-3 p-4 font-bold text-white hover:bg-blue-2"
      >
        Select a slot
      </Link>
    </Card>
  );
};

const InterviewPage = () => {
  const { interviewData, isLoading, interviewId } = useInterview();

  if (isLoading) return "Loading...";

  console.log(interviewData);

  if (interviewData.untilStart === "-1")
    return <SelectASlot interviewId={interviewId} />;

  return <InterviewRoom secondsUntilStart={interviewData.untilStart} />;
};

export default InterviewPage;
