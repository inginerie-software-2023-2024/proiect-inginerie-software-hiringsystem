"use client";

import React, { createContext, useState } from "react";
import useSWR from "swr";

interface InterviewContextParams {
  interviewData: any;
  interviewSlots: any;
  isLoading: boolean;
  selectedDate: string;
  setSelectedDate: any;
}

const InterviewSlotsContext = createContext({} as InterviewContextParams);

export const InterviewSlotsProvider = ({
  children,
  interviewId,
}: {
  children: React.ReactNode;
  interviewId: string;
}) => {
  const { data: interviewSlots, isLoading } = useSWR(
    `/api/interviews/schedule/${interviewId}/slots`,
    (url) => fetch(url).then((r) => r.json())
  );
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <InterviewSlotsContext.Provider
      value={{
        interviewSlots: interviewSlots?.slots,
        isLoading,
        interviewData: interviewSlots?.interview,
        selectedDate,
        setSelectedDate
      }}
    >
      {children}
    </InterviewSlotsContext.Provider>
  );
};

export default InterviewSlotsContext;
