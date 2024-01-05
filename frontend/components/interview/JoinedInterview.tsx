import { SocketProvider } from "@/context/SocketProvider";
import useInterview from "@/hooks/useInterview";
import React from "react";
import VideoBox from "./video/VideoBox";
import ChatBox from "./chat/ChatBox";

const JoinedInterview = () => {
  const { interviewId } = useInterview();

  return (
    <SocketProvider interviewId={interviewId}>
      <div className="absolute z-[-1] h-full w-full bg-gray-200" />
      <VideoBox />
      <ChatBox />
    </SocketProvider>
  );
};

export default JoinedInterview;
