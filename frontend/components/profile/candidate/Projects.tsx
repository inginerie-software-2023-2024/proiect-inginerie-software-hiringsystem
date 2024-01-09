import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import EditButton from "./EditButton";
import ProjectsModal from "./modals/ProjectsModal";

const ProjectEntry = ({ project }) => {
  return (
    <div className="my-10">
      <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
};

const Projects = ({ projects, isLoading, canEdit }) => {
  const [details, setDetails] = useState(null);

  if (!projects)
    return (
      <Card className="relative h-full rounded-md p-4 shadow-lg">
        An error has occured.
      </Card>
    );

  return (
    <Card className="relative h-full rounded-md p-4 shadow-lg">
      {canEdit && !isLoading && (
        <>
          <EditButton
            onClick={() => {
              setDetails({ ...projects });
            }}
          />
          <ProjectsModal details={details} setDetails={setDetails} />
        </>
      )}
      <CardHeader className="border-b-2">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
      </CardHeader>
      <CardContent className="lg:max-h-[20vh] lg:overflow-y-auto">
        {!isLoading &&
          projects?.map((project, index) => {
            return <ProjectEntry project={project} key={index} />;
          })}
        {!isLoading && projects.length === 0 && (
          <p className="mt-3 text-muted-foreground">No projects to show.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Projects;
