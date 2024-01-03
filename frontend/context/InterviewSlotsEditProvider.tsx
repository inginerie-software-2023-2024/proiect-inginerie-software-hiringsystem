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
  interviewerId: string;
}

const InterviewSlotsEditContext = createContext({} as InterviewContextParams);

export const InterviewSlotsEditorProvider = ({
  children,
  interviewerId,
}: {
  children: React.ReactNode;
  interviewerId: string;
}) => {
  const { data: interviewSlots, isLoading } = useSWR(
    `/api/interviews/slots/${interviewerId}`,
    (url) => fetch(url).then((r) => r.json())
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <InterviewSlotsEditContext.Provider
      value={{
        interviewSlots,
        isLoading,
        selectedDate,
        setSelectedDate,
        selectedSlot,
        setSelectedSlot,
        interviewerId,
      }}
    >
      {children}
    </InterviewSlotsEditContext.Provider>
  );
};

export default InterviewSlotsEditContext;
