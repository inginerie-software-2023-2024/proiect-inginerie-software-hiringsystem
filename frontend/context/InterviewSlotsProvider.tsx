"use client";

import React, { createContext, useState } from "react";
import useSWR from "swr";

interface InterviewContextParams {
  interviewSlots: any;
  isLoading: boolean;
  selectedDate: string;
  setSelectedDate: any;
  selectedSlot: any;
  setSelectedSlot: any;
  interviewId: string;
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
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <InterviewSlotsContext.Provider
      value={{
        interviewSlots,
        isLoading,
        selectedDate,
        setSelectedDate,
        selectedSlot,
        setSelectedSlot,
        interviewId,
      }}
    >
      {children}
    </InterviewSlotsContext.Provider>
  );
};

export default InterviewSlotsContext;
