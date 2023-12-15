"use client";

import React, { createContext, useState } from "react";
import useSWR from "swr";

interface InterviewContextParams {
  interviewData: any;
  isLoading: boolean;
  isMuted: boolean;
  setMuted: any;
  isCameraOff: boolean;
  setCameraOff: any;
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
  const [isMuted, setMuted] = useState<boolean>(false);
  const [isCameraOff, setCameraOff] = useState<boolean>(false);

  return (
    <InterviewContext.Provider
      value={{
        interviewData,
        isLoading,
        isMuted,
        setMuted,
        isCameraOff,
        setCameraOff,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export default InterviewContext;
