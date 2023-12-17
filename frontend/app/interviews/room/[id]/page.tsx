"use client";

import InterviewRoom from "@/components/interview/InterviewRoom";
import useInterview from "@/hooks/useInterview";
import React from "react";

const InterviewPage = () => {
  const { interviewData, isLoading } = useInterview();

  if (isLoading) return "Loading...";

  return <InterviewRoom secondsUntilStart={interviewData.untilStart}/>;
};

export default InterviewPage;
