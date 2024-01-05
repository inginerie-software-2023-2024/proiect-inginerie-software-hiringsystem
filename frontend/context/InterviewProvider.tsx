"use client";

import useStream from "@/hooks/useStream";
import { notFound } from "next/navigation";
import React, { createContext } from "react";
import useSWR from "swr";

interface InterviewContextParams {
  interviewData: any;
  isLoading: boolean;
  stream: any;
  interviewId: string;
}

const InterviewContext = createContext({} as InterviewContextParams);

export const InterviewProvider = ({
  children,
  interviewId,
}: {
  children: React.ReactNode;
  interviewId: string;
}) => {
  const { data: interviewData, isLoading } = useSWR(
    `/api/interviews/interview/${interviewId}`,
    (url) => fetch(url).then((r) => r.json())
  );

  const stream = useStream();

  if (!isLoading && !interviewData) {
    return notFound();
  }

  return (
    <InterviewContext.Provider
      value={{
        interviewData,
        isLoading,
        stream,
        interviewId,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export default InterviewContext;
