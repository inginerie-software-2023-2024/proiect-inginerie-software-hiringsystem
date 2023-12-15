"use client";

import CandidateProfilePage from "@/components/profile/candidate/CandidateProfilePage";
import InterviewerProfilePage from "@/components/profile/interviewer/InterviewerProfilePage";
import ManagerProfilePage from "@/components/profile/manager/ManagerProfilePage";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
  const {session, isLoading} = useAuth();

  if (isLoading)
    return "Loading...";

  if (session.roles?.includes("candidate"))
    return <CandidateProfilePage />

  if (session.roles?.includes("interviewer"))
    return <InterviewerProfilePage />

  if (session.roles?.includes("manager"))
    return <ManagerProfilePage />

  return "Nothing here";
}
