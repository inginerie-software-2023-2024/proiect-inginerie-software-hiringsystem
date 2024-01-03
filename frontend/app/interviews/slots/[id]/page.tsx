"use client";

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

    //   const organizedData: Record<
    //     string,
    //     { timeInMinutes: number; minutesDuration: number }[]
    //   > = {};

    //   // Populate the object with data organized by date
    //   interviewSlots.forEach(
    //     (dateAndMinutes: { date: string; durationInMinutes: number }) => {
    //       const date = new Date(dateAndMinutes.date);
    //       const formattedDate = dateAndMinutes.date.split("T")[0];

    //       // If the date is not in the organizedData object, initialize an empty array
    //       if (!organizedData[formattedDate]) {
    //         organizedData[formattedDate] = [];
    //       }

    //       // Add the current date and minutes to the array
    //       organizedData[formattedDate].push({
    //         timeInMinutes: date.getHours() * 60 + date.getMinutes(),
    //         minutesDuration: dateAndMinutes.durationInMinutes,
    //       });
    //     }
    //   );

    //   setDateTimes(organizedData);
    if (!selectedDate && interviewSlots && Object.keys(interviewSlots).length !== 0)
      setSelectedDate(Object.keys(interviewSlots)[0]);
  }, [isLoading, interviewSlots]);

  if (isLoading) return "Loading...";

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
