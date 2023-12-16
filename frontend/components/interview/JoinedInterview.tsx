import { SocketProvider } from "@/context/SocketProvider";
import useInterview from "@/hooks/useInterview";
import React, { useEffect, useRef } from "react";
import VideoBox from "./video/VideoBox";

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
      <VideoBox />
    </SocketProvider>
  );
};

export default JoinedInterview;
