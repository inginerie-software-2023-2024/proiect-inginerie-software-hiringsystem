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
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/simple-peer/9.11.1/simplepeer.min.js"
        async
      ></script>
      <InterviewProvider interviewId={id}>{children}</InterviewProvider>
    </>
  );
}
