import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import React from "react";

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}:${remainingMinutes < 10 ? "0" : ""}${remainingMinutes}`;
}

const HourIntervalButton = ({
  startMinute,
  minutesDuration,
}: {
  startMinute: number;
  minutesDuration: number;
}) => {
  return (
    <Button className="h-12" variant="outline">
      {formatTime(startMinute)} - {formatTime(startMinute + minutesDuration)}
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
      <h2 className="mb-2 text-xl font-semibold">Select a slot</h2>
      <CardDescription>
        You can choose an interval for date <b>{date}</b>
      </CardDescription>
      <div className="mt-9 grid grid-cols-3 gap-4">
        {times.map((time) => {
          return (
            <HourIntervalButton
              key={time.timeInMinutes}
              startMinute={time.timeInMinutes}
              minutesDuration={time.minutesDuration}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default AvailableHours;
