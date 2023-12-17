import useCountdown from "@/hooks/useCountdown";
import React, { useState } from "react";
import InterviewCountdown from "./InterviewCountdown";
import InterviewLobby from "./InterviewLobby";
import JoinedInterview from "./JoinedInterview";

const InterviewRoom = ({
  secondsUntilStart,
}: {
  secondsUntilStart: number;
}) => {
  const [days, hours, minutes, seconds] = useCountdown(secondsUntilStart);
  const [ready, setReady] = useState(false);

  if (days + hours + minutes + seconds > 0) {
    if (ready)
      return <JoinedInterview />
    return <InterviewLobby setReady={setReady}/>;
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
