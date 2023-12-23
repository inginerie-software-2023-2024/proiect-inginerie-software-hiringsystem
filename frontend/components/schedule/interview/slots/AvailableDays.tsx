import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import useInterviewSlots from "@/hooks/useInterviewSlots";
import React from "react";

const AvailableDayButton = ({
  date,
  count,
}: {
  date: string;
  count: number;
}) => {
  const { setSelectedDate } = useInterviewSlots();
  return (
    <button
      onClick={() => setSelectedDate(date)}
      className="block rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <Badge className="mr-2">{count} Slots</Badge>
      {date}
    </button>
  );
};

const AvailableDays = ({
  dateTimes,
}: {
  dateTimes: Record<
    string,
    { timeInMinutes: number; minutesDuration: number }[]
  >;
}) => {
  return (
    <Card className="relative row-span-2 h-full rounded-md p-4 shadow-lg">
      <h2 className="text-lg font-semibold">Available Days</h2>
      <ul className="mt-4 space-y-2">
        {Object.entries(dateTimes).map(([formattedDate, timeList]) => {
          return (
            <li key={formattedDate}>
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
