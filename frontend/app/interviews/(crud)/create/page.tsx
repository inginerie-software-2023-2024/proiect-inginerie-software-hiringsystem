"use client";

import ParticipantsList, {
  Participant,
} from "@/components/interview/crud/ParticipantsList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InfoIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const CreateInterview = () => {
  const searchParams = useSearchParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const router = useRouter();
  const [error, setError] = useState("");

  const applicationId = searchParams.get("with-application");

  const createInterview = async () => {
    if (!participants.some((p) => p.type === "candidate")) {
      setError("You need at least one candidate.");
      return;
    }

    if (
      !participants.some(
        (p) => p.type === "interviewer" || p.type === "manager"
      )
    ) {
      setError("You need at least one manager or interviewer.");
      return;
    }

    setError("");

    const payload = {
      applicationId,
      participants,
    };

    const res = await fetch("http://localhost:3000/api/interviews/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError("Couldn't create interview.");
      return;
    }

    router.push("/slots/me");
  };

  return (
    <Card className="m-auto self-center p-10">
      <CardHeader className="mb-3">
        <CardTitle>Create Interview</CardTitle>
        <CardDescription>
          This will create an internal interview room and make it appear for the
          participants in the My Interviews page.
        </CardDescription>
      </CardHeader>
      <ParticipantsList
        applicationId={applicationId}
        participants={participants}
        setParticipants={setParticipants}
      />
      <div className="mt-7 flex max-w-2xl gap-2 text-muted-foreground">
        <InfoIcon /> The date of the interview will be later selected by a
        candidate in the list above.
        <br /> You can not have an interview without at least one candidate.
      </div>
      <Button
        className="mt-5 bg-green-600 hover:bg-green-400"
        size="lg"
        onClick={createInterview}
      >
        Create Interview
      </Button>
      <p className="text-sm font-medium text-destructive">{error}</p>
    </Card>
  );
};

export default CreateInterview;
