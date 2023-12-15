import useCountdown from "@/hooks/useCountdown";
import React from "react";
import InterviewCountdown from "./InterviewCountdown";
import InterviewLobby from "./InterviewLobby";

const InterviewRoom = ({
  secondsUntilStart,
}: {
  secondsUntilStart: number;
}) => {
  const [days, hours, minutes, seconds] = useCountdown(secondsUntilStart);

  if (days + hours + minutes + seconds > 0) {
    return <InterviewLobby />;
  }

  return (
    <InterviewCountdown
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
};

export default InterviewRoom;
