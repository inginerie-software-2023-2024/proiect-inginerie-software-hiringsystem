import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import React from "react";

const ProjectEntry = ({ project }) => {
  return (
    <div className="my-10">
      <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
};

const Projects = ({ projects, isLoading }) => {
  return (
    <Card className="h-full rounded-md p-4 shadow-lg">
      <CardHeader className="border-b-2">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
      </CardHeader>
      <CardContent className="lg:max-h-[20vh] lg:overflow-y-auto">
        {!isLoading &&
          projects.map((project, index) => {
            return <ProjectEntry project={project} key={index} />;
          })}
      </CardContent>
    </Card>
  );
};

export default Projects;
