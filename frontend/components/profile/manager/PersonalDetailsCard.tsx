"use client";

import { MailIcon, PhoneIcon } from "lucide-react";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import managerJpg from "@/public/assets/images/manager.jpg";
import Image from "next/image";

const PersonalDetailsCard = ({ user, isLoading }) => {
  console.log(user);
  return (
    <Card className="relative flex h-full flex-col items-center justify-around gap-10 rounded-md p-7 shadow-lg">
      <Image
        src={managerJpg}
        alt="ManagerLogo"
        draggable={false}
        className="h-[50vh] w-auto rounded-[50%]"
      />
      {!isLoading && (
        <>
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-0.5 text-xs">
              <div className="text-2xl font-medium text-gray-800">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-sm text-gray-500">Manager Profile</div>
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

          {user.professionalBackground && (
            <div>
              <b>Professional Background:</b>
              <br />
              {user.professionalBackground}
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default PersonalDetailsCard;
