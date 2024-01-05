import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from "lucide-react";
import candidatePng from "@/public/assets/images/candidate.png";
import Image from "next/image";
import EditButton from "./EditButton";
import PersonalDetailsModal from "./modals/PersonalDetailsModal";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import ChangePasswordButton from "../ChangePasswordButton";
const PersonalDetailsCard = ({ user, skills, isLoading, canEdit }) => {
  const [details, setDetails] = useState(null);
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const onUpdate = (updatedValues) => {
    setDetails({ details: updatedValues, skills });
  };

  return (
    <Card className="relative flex h-full flex-col items-center justify-around gap-5 rounded-md p-7 shadow-lg">
      <Image src={candidatePng} alt="CandidateLogo" draggable={false} />
      {!isLoading && (
        <>
          {canEdit && (
            <>
              <ChangePasswordButton
                onClick={() => {
                  setChangePasswordModal(true);
                }}
              />
              <ChangePasswordModal
                changePasswordModal={changePasswordModal}
                setChangePasswordModal={setChangePasswordModal}
              />

              <EditButton
                onClick={() => {
                  setDetails({ details: { ...user }, skills: { ...skills } });
                }}
              />
              <PersonalDetailsModal
                details={details}
                setDetails={setDetails}
                onUpdate={onUpdate}
              />
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
              {user.githubProfileLink ? (
                <Link
                  className="font-medium underline"
                  href={user.githubProfileLink}
                >
                  GitHub
                </Link>
              ) : (
                "Not specified"
              )}
            </div>
            <div className="flex items-center gap-2">
              <LinkedinIcon className="h-6 w-6" />
              {user.linkedInProfileLink ? (
                <Link
                  className="font-medium underline"
                  href={user.linkedInProfileLink}
                >
                  LinkedIn
                </Link>
              ) : (
                "Not specified"
              )}
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
