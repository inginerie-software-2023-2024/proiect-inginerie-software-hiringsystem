"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import React, { useState } from "react";
import EditButton from "./EditButton";
import WorkExperienceModal from "./modals/WorkExperienceModal";

const WorkEntry = ({ work }) => {
  return (
    <div className="my-10">
      <h3 className="text-lg font-bold text-gray-800">{work.position}</h3>
      <h5>
        {formatDate(work.startDate)} - {formatDate(work.endDate)}
      </h5>
      <p className="text-gray-600">{work.company}</p>
    </div>
  );
};

const WorkExperience = ({ experiences, isLoading, canEdit }) => {
  const [details, setDetails] = useState(null);

  return (
    <Card className="relative h-full rounded-md p-4 shadow-lg">
      {canEdit && !isLoading && (
        <>
          <EditButton
            onClick={() => {
              setDetails({ ...experiences });
            }}
          />
          <WorkExperienceModal details={details} setDetails={setDetails} />
        </>
      )}
      <CardHeader className="border-b-2">
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
      </CardHeader>
      <CardContent className="lg:max-h-[32vh] lg:overflow-y-auto">
        {!isLoading &&
          experiences.map((work, index) => {
            return <WorkEntry work={work} key={index} />;
          })}
      </CardContent>
    </Card>
  );
};

export default WorkExperience;
