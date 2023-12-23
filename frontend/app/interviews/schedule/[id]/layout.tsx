import { InterviewSlotsProvider } from "@/context/InterviewSlotsProvider";
import React from "react";

export default function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>
      <InterviewSlotsProvider interviewId={id}>
        {children}
      </InterviewSlotsProvider>
    </>
  );
}
