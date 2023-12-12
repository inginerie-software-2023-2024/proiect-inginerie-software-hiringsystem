import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import React from "react";

const AcademicEntry = ({ academic }) => {
  return (
    <div className="my-10">
      <h3 className="text-lg font-bold text-gray-800">
        {academic.specialization} {academic.level && `- ${academic.level}`}
      </h3>
      <h5>
        {formatDate(academic.startDate)} - {formatDate(academic.endDate)}
      </h5>
      <p className="text-gray-600">{academic.institution}</p>
    </div>
  );
};

const AcademicBackground = ({ academics, isLoading }) => {
  return (
    <Card className="h-full rounded-md p-4 shadow-lg">
      <CardHeader className="border-b-2">
        <h2 className="text-2xl font-bold text-gray-800">
          Academic Background
        </h2>
      </CardHeader>
      <CardContent className="lg:max-h-[40vh] lg:overflow-y-auto">
        {!isLoading &&
          academics.map((academic, index) => {
            return <AcademicEntry academic={academic} key={index} />;
          })}
      </CardContent>
    </Card>
  );
};

export default AcademicBackground;
