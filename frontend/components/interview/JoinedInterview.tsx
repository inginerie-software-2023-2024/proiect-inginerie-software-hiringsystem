import { SocketProvider } from "@/context/SocketProvider";
import useInterview from "@/hooks/useInterview";
import React, { useEffect, useRef } from "react";
import VideoBox from "./video/VideoBox";
import ChatBox from "./chat/ChatBox";

const JoinedInterview = () => {
  const videoPreview = useRef<HTMLVideoElement>(null);
  const { stream, interviewId } = useInterview();

  useEffect(() => {
    if (
      stream.stream &&
      videoPreview.current &&
      !videoPreview.current.srcObject
    ) {
      videoPreview.current.srcObject = stream.stream;
    }
  }, []);

  return (
    <SocketProvider interviewId={interviewId}>
      <div className="absolute h-full w-full bg-gray-200" />
      <VideoBox />
      <ChatBox />
    </SocketProvider>
  );
};

export default JoinedInterview;
