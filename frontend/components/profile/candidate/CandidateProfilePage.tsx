"use client";

import PersonalDetailsCard from "@/components/profile/candidate/PersonalDetailsCard";
import useSWR from "swr";
import AcademicBackground from "@/components/profile/candidate/AcademicBackground";
import WorkExperience from "@/components/profile/candidate/WorkExperience";
import Projects from "@/components/profile/candidate/Projects";

export default function CandidateProfilePage() {
  const { data: userAndCV, isLoading } = useSWR(
    "/api/users/me/profile/candidate",
    (url) => fetch(url).then((r) => r.json())
  );

  const canEdit = true;

  return (
    <div className="w-full flex-1 bg-gray-200 p-10">
      <div className="grid h-full grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 lg:row-span-2">
          <PersonalDetailsCard
            user={userAndCV?.user}
            skills={userAndCV?.cv?.skills}
            isLoading={isLoading}
            canEdit={canEdit}
          />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <AcademicBackground
            academics={userAndCV?.cv?.academicBackground}
            isLoading={isLoading}
            canEdit={canEdit}
          />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <WorkExperience
            experiences={userAndCV?.cv?.workExperience}
            isLoading={isLoading}
            canEdit={canEdit}
          />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <Projects projects={userAndCV?.cv?.projects} isLoading={isLoading} canEdit={canEdit}/>
        </div>
      </div>
    </div>
  );
}