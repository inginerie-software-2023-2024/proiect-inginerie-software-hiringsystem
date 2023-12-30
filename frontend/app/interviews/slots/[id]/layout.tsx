"use client"

import { InterviewSlotsEditorProvider } from "@/context/InterviewSlotsEditProvider";
import useAuth from "@/hooks/useAuth";
import React from "react";

export default function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const {session} = useAuth();
  if (!session.userId)
    return;

  if (id === "me"){
    id = session.userId;
  }

  return (
    <>
      <InterviewSlotsEditorProvider interviewerId={id}>
        {children}
      </InterviewSlotsEditorProvider>
    </>
  );
}
