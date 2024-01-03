import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import useInterviewSlots from "@/hooks/useInterviewSlots";
import { cn } from "@/lib/utils";
import React from "react";

const AvailableDayButton = ({
  date,
  count,
  selected,
}: {
  date: string;
  count: number;
  selected?: boolean;
}) => {
  const { setSelectedDate } = useInterviewSlots();
  return (
    <button
      onClick={() => setSelectedDate(date)}
      className={cn(
        "flex w-full justify-between rounded p-2 hover:bg-gray-100",
        selected && "bg-blue-2 hover:bg-blue-1 text-white"
      )}
    >
      {date}
      <Badge className="mr-2">{count} Slots</Badge>
    </button>
  );
};

const AvailableDays = ({
  dateTimes,
  selectedDay,
}: {
  dateTimes: any
  selectedDay: string;
}) => {
  return (
    <Card className="relative row-span-2 h-full rounded-md p-4 shadow-lg">
      <h2 className="text-lg font-semibold">Available Days</h2>
      <ul className="mt-4 space-y-2">
        {Object.entries(dateTimes).map(([formattedDate, timeList]) => {
          if (formattedDate === selectedDay)
            return (
              <li key={formattedDate} className="w-full">
                <AvailableDayButton
                  date={formattedDate}
                  count={timeList.length}
                  selected
                />
              </li>
            );

          return (
            <li key={formattedDate} className="w-full">
              <AvailableDayButton
                date={formattedDate}
                count={timeList.length}
              />
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default AvailableDays;
