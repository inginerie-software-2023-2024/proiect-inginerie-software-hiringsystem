"use client";

import GenericLoading from "@/components/loading/GenericLoading";
import InterviewCalendar from "@/components/schedule/interviewer/InterviewCalendar";
import AvailableDays from "@/components/schedule/interviewer/slots/AvailableDays";
import AvailableHours from "@/components/schedule/interviewer/slots/AvailableHours";
import { ModifySlotModal } from "@/components/schedule/interviewer/slots/ModifySlotModal";
import useInterviewSlotsEditor from "@/hooks/useInterviewSlotsEditor";
import React, { useEffect } from "react";

const ScheduleInterview = () => {
  const { interviewSlots, isLoading, selectedDate, setSelectedDate } =
    useInterviewSlotsEditor();

  useEffect(() => {
    if (isLoading) return;

    if (
      !selectedDate &&
      interviewSlots &&
      Object.keys(interviewSlots).length !== 0
    )
      setSelectedDate(Object.keys(interviewSlots)[0]);
  }, [isLoading, interviewSlots]);

  if (isLoading) return <GenericLoading />;

  return (
    <div className="grid w-full flex-1 grid-cols-4 items-stretch justify-items-stretch gap-5 bg-gray-200 p-10">
      <ModifySlotModal />
      <AvailableDays dateTimes={interviewSlots} selectedDay={selectedDate} />
      <AvailableHours
        date={selectedDate}
        times={interviewSlots[selectedDate]}
      />
      <InterviewCalendar dateTimes={interviewSlots} />
    </div>
  );
};

export default ScheduleInterview;
