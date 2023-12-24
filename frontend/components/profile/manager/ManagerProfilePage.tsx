"use client";

import useSWR from "swr";
import PersonalDetailsCard from "./PersonalDetailsCard";

export default function InterviewerProfilePage() {
  const { data: user, isLoading } = useSWR(
    "/api/users/me/profile/manager",
    (url) => fetch(url).then((r) => r.json())
  );

  const canEdit = true;

  return (
    <div className="w-full flex-1 bg-gray-200 p-10">
      <div className="grid h-full grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <PersonalDetailsCard user={user} isLoading={isLoading} canEdit={canEdit}/>
        </div>
      </div>
    </div>
  );
}
