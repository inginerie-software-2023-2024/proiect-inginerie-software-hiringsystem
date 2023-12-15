import { InterviewProvider } from "@/context/InterviewProvider";
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
      <InterviewProvider interviewId={id}>{children}</InterviewProvider>
    </>
  );
}
