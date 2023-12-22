"use client";

import { MailIcon, PhoneIcon } from "lucide-react";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import interviewerJpg from "@/public/assets/images/interviewer.jpg";
import Image from "next/image";
import ChangePasswordButton from "./ChangePasswordButton";
import ChangePasswordModal from "./modals/ChangePasswordModal";

const PersonalDetailsCard = ({ user, isLoading, canEdit }) => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  console.log(user);
  return (
    <Card className="relative flex h-full items-center justify-around gap-20 rounded-md p-7 shadow-lg">
      <Image
        src={interviewerJpg}
        alt="InterviewerLogo"
        draggable={false}
        className="h-[50vh] w-auto"
      />
      {!isLoading && (
        <>
          {canEdit && (
            <>
              <ChangePasswordButton
                onClick={() => { 
                  setChangePasswordModal(true);
                }}
              />
              <ChangePasswordModal changePasswordModal={changePasswordModal} setChangePasswordModal={setChangePasswordModal}/>
            </>
          )}
        <div className="flex h-full flex-1 flex-col justify-around">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-0.5 text-xs">
              <div className="text-2xl font-medium text-gray-800">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-sm text-gray-500">Interviewer Profile</div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2">
              <MailIcon className="h-6 w-6" />
              <a className="font-medium underline" href="#">
                {user.primaryEmail}
              </a>
            </div>
            {/* {user.mailList.slice(1).map((email) => {
                return <div key={email}>{email}</div>;
            })} */}
            {user.phoneNumberList.length > 0 && (
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-6 w-6" />
                <a className="font-medium underline" href="#">
                  {user.phoneNumberList[0]}
                </a>
              </div>
            )}
            {/* {user.phoneNumberList.slice(1).map((phoneNumber) => {
                return <div key={phoneNumber}>{phoneNumber}</div>;
            })} */}
          </div>
          <div className="flex flex-col gap-3">
            <div>
              Interviewer type: <Badge>{user.interviewerType}</Badge>
            </div>
            <div>
              <b>Professional Background:</b>
              <br />
              {user.professionalBackground}
            </div>
          </div>
        </div>
        </>
      )}
    </Card>
  );
};

export default PersonalDetailsCard;
