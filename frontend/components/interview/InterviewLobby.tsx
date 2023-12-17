"use client";

import {
  CardHeader,
  CardContent,
  Card,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  CameraIcon,
  CameraOffIcon,
  MicIcon,
  MicOffIcon,
} from "lucide-react";
import useInterview from "@/hooks/useInterview";
import { useEffect, useRef } from "react";

export default function InterviewLobby({ setReady }) {
  const { interviewData, stream } = useInterview();
  const videoPreview = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoPreview.current) return;

    stream.createStream();
  }, []);

  useEffect(() => {
    if (stream.stream && videoPreview.current) {
      videoPreview.current.srcObject = stream.stream;
    }
  }, [stream.stream]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Interview Waiting Room</h2>
            <CardDescription>
              Joining as {interviewData.participantInfo.firstName}{" "}
              {interviewData.participantInfo.lastName}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
              <span className="h-full w-full rounded-md bg-muted object-cover" />
              <video muted ref={videoPreview} autoPlay playsInline />
            </div>
            <div className="flex space-x-4">
              <Button
                aria-label="Toggle video"
                onClick={() => {
                  stream.toggle("video")();
                }}
              >
                {!stream.visible ? (
                  <CameraOffIcon className="h-4 w-4" />
                ) : (
                  <CameraIcon className="h-4 w-4" />
                )}
              </Button>
              <Button
                aria-label="Toggle audio"
                onClick={() => {
                  stream.toggleAudio();
                }}
              >
                {stream.muted ? (
                  <MicOffIcon className="h-4 w-4" />
                ) : (
                  <MicIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => setReady(true)}
            >
              Join Meeting
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
