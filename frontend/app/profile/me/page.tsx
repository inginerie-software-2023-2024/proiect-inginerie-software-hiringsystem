"use client";

import CandidateProfilePage from "@/components/profile/candidate/CandidateProfilePage";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
  const {session, isLoading} = useAuth();

  if (isLoading)
    return "Loading...";

  if (session.roles?.includes("candidate"))
    return <CandidateProfilePage />

  return "Nothing here";
}
