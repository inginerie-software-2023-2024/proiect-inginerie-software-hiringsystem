import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import React from "react";
import { SlotConfirmModal } from "./SlotConfirmModal";
import useInterviewSlots from "@/hooks/useInterviewSlots";
import { formatTimeForInterview } from "@/lib/utils";

const HourIntervalButton = ({
  startMinute,
  minutesDuration,
}: {
  startMinute: number;
  minutesDuration: number;
}) => {
  const { selectedDate, setSelectedSlot } = useInterviewSlots();

  return (
    <Button
      className="h-12"
      variant="outline"
      onClick={() =>
        setSelectedSlot({ startMinute, minutesDuration, date: selectedDate })
      }
    >
      {formatTimeForInterview(startMinute)} -{" "}
      {formatTimeForInterview(startMinute + minutesDuration)}
    </Button>
  );
};

const HourIntervalButtons = ({
  times,
}: {
  times: { timeInMinutes: number; minutesDuration: number }[];
}) => {
  return (
    <>
      <SlotConfirmModal />
      {times.map((time) => {
        return (
          <HourIntervalButton
            key={time.timeInMinutes}
            startMinute={time.timeInMinutes}
            minutesDuration={time.minutesDuration}
          />
        );
      })}
    </>
  );
};

const AvailableHours = ({
  date,
  times,
}: {
  date: string;
  times: { timeInMinutes: number; minutesDuration: number }[];
}) => {
  if (!times) {
    return (
      <Card className="relative col-span-3 h-full rounded-md p-4 shadow-lg"></Card>
    );
  }

  return (
    <Card className="relative col-span-3 h-full rounded-md p-4 shadow-lg">
      <h2 className="mb-2 text-xl font-semibold">Select a slot</h2>
      <CardDescription>
        You can choose an interval for date <b>{date}</b>
      </CardDescription>
      <div className="mt-9 grid grid-cols-3 gap-4">
        <HourIntervalButtons times={times} />
      </div>
    </Card>
  );
};

export default AvailableHours;
