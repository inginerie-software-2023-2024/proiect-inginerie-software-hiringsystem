import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import React from "react";

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

const WorkExperience = ({ experiences, isLoading }) => {
  return (
    <Card className="h-full rounded-md p-4 shadow-lg">
      <CardHeader className="border-b-2">
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
      </CardHeader>
      <CardContent className="lg:max-h-[40vh] lg:overflow-y-auto">
        {!isLoading &&
          experiences.map((work, index) => {
            return <WorkEntry work={work} key={index} />;
          })}
      </CardContent>
    </Card>
  );
};

export default WorkExperience;
