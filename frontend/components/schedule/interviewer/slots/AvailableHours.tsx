import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import React from "react";
import { formatTimeForInterview } from "@/lib/utils";
import useInterviewSlotsEditor from "@/hooks/useInterviewSlotsEditor";

const HourIntervalButtonForDelete = ({
  startMinute,
  minutesDuration,
}: {
  startMinute: number;
  minutesDuration: number;
}) => {
  const { selectedDate, setSelectedSlot } = useInterviewSlotsEditor();

  return (
    <Button
      className="flex h-12 flex-col"
      variant="outline"
      onClick={() =>
        setSelectedSlot({
          startMinute,
          minutesDuration,
          date: selectedDate,
          modifyAction: "remove",
        })
      }
    >
      {formatTimeForInterview(startMinute)} -{" "}
      {formatTimeForInterview(startMinute + minutesDuration)}
      <span className="text-muted-foreground">(Click to Delete)</span>
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
      {times.map((time) => {
        return (
          <HourIntervalButtonForDelete
            key={time.timeInMinutes}
            startMinute={time.timeInMinutes}
            minutesDuration={time.minutesDuration}
          />
        );
      })}
    </>
  );
};

const AddSlotButton = () => {
  const { selectedDate, setSelectedSlot } = useInterviewSlotsEditor();

  return (
    <Button
      onClick={() => {
        setSelectedSlot({ date: selectedDate, modifyAction: "add" });
      }}
      className="h-full rounded bg-green-500 text-white hover:bg-green-400"
    >
      Add Slot
    </Button>
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
      <h2 className="mb-2 text-xl font-semibold">Available slots</h2>
      <CardDescription>
        Slots for date <b>{date}</b>
      </CardDescription>
      <div className="mt-9 grid grid-cols-3 gap-4">
        <HourIntervalButtons times={times} />
        <AddSlotButton />
      </div>
    </Card>
  );
};

export default AvailableHours;
