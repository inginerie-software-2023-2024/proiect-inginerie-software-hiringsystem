import { Card } from "@/components/ui/card";
import { CircleIcon } from "lucide-react";
import React from "react";
import { DayPicker, DayProps, useDayRender } from "react-day-picker";
import { format } from "date-fns";
import useInterviewSlotsEditor from "../../../hooks/useInterviewSlotsEditor";

function CalendarDay(props: DayProps & { dateTimes: any }) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);
  const { setSelectedDate, setSelectedSlot } = useInterviewSlotsEditor();

  if (dayRender.isHidden) {
    return <></>;
  }

  if (!props.dateTimes || !props.dateTimes[format(props.date, "yyyy-MM-dd")]) {
    return (
      <button
        {...dayRender.buttonProps}
        ref={buttonRef}
        onClick={() => {
          setSelectedSlot({
            date: format(props.date, "yyyy-MM-dd"),
            modifyAction: "add",
          });
        }}
        className="px-4"
      />
    );
  }

  return (
    <>
      <button
        {...dayRender.buttonProps}
        ref={buttonRef}
        onClick={() => setSelectedDate(format(props.date, "yyyy-MM-dd"))}
        className="px-4 font-bold"
      />
      <CircleIcon
        fill="lightblue"
        className="absolute right-[5px] top-[13px] h-3 w-3"
      />
    </>
  );
}

// eslint-disable-next-line react/display-name
const CalendarDayWithDateTimes = (dateTimes: any) => (props: DayProps) => (
  <CalendarDay {...props} dateTimes={dateTimes} />
);

const InterviewCalendar = ({ dateTimes }) => {
  const CustomDay = CalendarDayWithDateTimes(dateTimes);

  return (
    <Card className="relative col-span-3 h-full rounded-md p-4 shadow-lg">
      <DayPicker
        className="h-full w-full"
        components={{ Day: CustomDay }}
        styles={{
          table: { flexGrow: 1 },
          months: {
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            gap: "20px",
          },
          cell: { position: "relative" },
          month: {
            height: "100%",
            position: "relative",
            display: "inline-flex",
            flexDirection: "column",
          },
          caption: { lineHeight: "4rem" },
        }}
        numberOfMonths={2}
        disableNavigation
      />
    </Card>
  );
};

export default InterviewCalendar;
