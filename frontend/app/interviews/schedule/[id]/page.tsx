"use client";

import InterviewCalendar from "@/components/schedule/interview/InterviewCalendar";
import AvailableDays from "@/components/schedule/interview/slots/AvailableDays";
import AvailableHours from "@/components/schedule/interview/slots/AvailableHours";
import useInterviewSlots from "@/hooks/useInterviewSlots";
import React, { useEffect } from "react";

const ScheduleInterview = () => {
  const { interviewSlots, isLoading, selectedDate, setSelectedDate } =
    useInterviewSlots();

  useEffect(() => {
    if (isLoading) return;

    if (
      !selectedDate &&
      interviewSlots &&
      Object.keys(interviewSlots).length !== 0
    )
      setSelectedDate(Object.keys(interviewSlots)[0]);
  }, [isLoading, interviewSlots]);

  if (isLoading) return "Loading...";

  return (
    <div className="grid w-full flex-1 grid-cols-4 items-stretch justify-items-stretch gap-5 bg-gray-200 p-10">
      <AvailableDays dateTimes={interviewSlots} selectedDay={selectedDate} />
      <AvailableHours date={selectedDate} times={interviewSlots[selectedDate]} />
      <InterviewCalendar dateTimes={interviewSlots} />
    </div>
  );
};

export default ScheduleInterview;
