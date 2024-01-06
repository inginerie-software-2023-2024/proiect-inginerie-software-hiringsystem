"use client";

import CandidateProfilePage from "@/components/profile/candidate/CandidateProfilePage";
import { notFound, useParams } from "next/navigation";
import React from "react";

const CandidateView = () => {
  const params = useParams<{ id: string }>();

  const id = params.id;

  if (!id) return notFound();

  return <CandidateProfilePage id={id} />;
};

export default CandidateView;
