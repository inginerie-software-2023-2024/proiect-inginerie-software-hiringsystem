"use client";

import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from "lucide-react";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import candidatePng from "@/public/assets/images/candidate.png";
import Image from "next/image";
import EditButton from "./EditButton";
import PersonalDetailsModal from "./modals/PersonalDetailsModal";

const PersonalDetailsCard = ({ user, skills, isLoading, canEdit }) => {
  const [details, setDetails] = useState(null);

  return (
    <Card className="relative flex h-full flex-col items-center justify-around gap-5 rounded-md p-7 shadow-lg">
      <Image src={candidatePng} alt="CandidateLogo" draggable={false} />
      {!isLoading && (
        <>
          {canEdit && (
            <>
              <EditButton
                onClick={() => {
                  setDetails({ details: {...user}, skills: {...skills} });
                }}
              />
              <PersonalDetailsModal details={details} setDetails={setDetails} />
            </>
          )}
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-0.5 text-xs">
              <div className="text-2xl font-medium text-gray-800">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-sm text-gray-500">Candidate Profile</div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2">
              <GithubIcon className="h-6 w-6" />
              <Link
                className="font-medium underline"
                href={user.githubProfileLink}
              >
                GitHub
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <LinkedinIcon className="h-6 w-6" />
              <Link
                className="font-medium underline"
                href={user.linkedInProfileLink}
              >
                LinkedIn
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="h-6 w-6" />
              <a className="font-medium underline" href="#">
                {user.primaryEmail}
              </a>
            </div>
            {user.phoneNumberList.length > 0 && (
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-6 w-6" />
                <a className="font-medium underline" href="#">
                  {user.phoneNumberList[0]}
                </a>
              </div>
            )}
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800">Skills</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill, index) => {
                return (
                  <Badge variant="secondary" key={index}>
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default PersonalDetailsCard;