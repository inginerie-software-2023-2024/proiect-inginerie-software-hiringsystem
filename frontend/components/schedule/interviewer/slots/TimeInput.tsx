import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";

const minutesToTime = (minutes_) => {
  const [hours, minutes] = [minutes_ / 60, minutes_ % 60];
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hoursString}:${minutesString}`;
};

const timeToMinutes = (time) => {
  try {
    const [hours, minutes] = time.split(":");
    const toReturn = parseInt(hours) * 60 + parseInt(minutes);
    if (Number.isNaN(toReturn)) return 0;
    return toReturn;
  } catch (err) {
    return 0;
  }
};

const TimeInput = ({
  name,
  form,
  className,
}: {
  name: string;
  form: any;
  className?: string;
}) => {
  const [minutes, setMinutes] = useState(form.getValues(name) || 0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef) return;

    inputRef.current.value = minutesToTime(minutes);
  }, [inputRef]);

  return (
    <Input
      className={className}
      ref={inputRef}
      placeholder="hh:mm"
      pattern="\d\d:\d\d"
      onChange={(input) => {
        const minutesToSet = timeToMinutes(input.target.value);
        form.setValue(name, minutesToSet);
        setMinutes(minutesToSet);
      }}
    />
  );
};

export default TimeInput;
