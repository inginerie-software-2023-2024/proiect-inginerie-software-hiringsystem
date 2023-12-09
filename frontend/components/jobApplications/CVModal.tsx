import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { GithubIcon, LinkedinIcon, MailIcon, X } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import * as DialogPrimitive from "@radix-ui/react-dialog";

function formatDate(date) {
  if (!date) {
    return "N/A";
  }

  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
}

const AcademicBackground = ({ academicBackground }) => {
  if (!academicBackground)
    return <h1 className="ml-5 mt-3">No academic background specified.</h1>;

  return (
    <Table>
      <TableBody>
        {academicBackground.map((academic, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {academic.specialization}{" "}
                {academic.level && `- ${academic.level}`}
              </TableCell>
              <TableCell>{academic.institution}</TableCell>
              <TableCell>
                {formatDate(academic.startDate)} -{" "}
                {formatDate(academic.endDate)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const WorkExperience = ({ workExperience }) => {
  if (!workExperience)
    return <h1 className="ml-5 mt-3">No work experience specified.</h1>;

  return (
    <Table>
      <TableBody>
        {workExperience.map((experience, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {experience.position}
              </TableCell>
              <TableCell>{experience.company}</TableCell>
              <TableCell>
                {formatDate(experience.startDate)} -{" "}
                {formatDate(experience.endDate)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const Projects = ({ projects }) => {
  if (!projects) return <h1 className="ml-5 mt-3">No projects specified.</h1>;

  return (
    <Table>
      <TableBody>
        {projects.map((project, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell className="text-justify">
                {project.description}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const Skills = ({ skills }) => {
  if (!skills) return <h1 className="ml-5 mt-3">No skills specified.</h1>;

  return (
    <div className="mt-2 flex flex-wrap">
      {skills.map((skill, index) => {
        return (
          <Badge className="m-1" key={index}>
            {skill}
          </Badge>
        );
      })}
    </div>
  );
};

const CVModalHeader = ({ cv }) => {
  return (
    <div>
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-semibold">
          {cv.user.firstName} {cv.user.lastName}
        </h2>
        <div className="mt-6 flex justify-between">
          <Link className="text-blue-500" href="#">
            <MailIcon className="mr-1 inline-block h-4 w-4" />
            {cv.user.primaryEmail}
          </Link>
          <div className="flex flex-col items-end gap-2">
            {cv.user.githubProfileLink && (
              <Link className="text-blue-500" href={cv.user.githubProfileLink}>
                <GithubIcon className="mr-1 inline-block h-4 w-4" />
                GitHub
              </Link>
            )}
            {cv.user.linkedInProfileLink && (
              <Link
                className="text-blue-500"
                href={cv.user.linkedInProfileLink}
              >
                <LinkedinIcon className="mr-1 inline-block h-4 w-4" />
                LinkedIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CVModalContent = ({ cv }) => {
  return (
    <div className="flex flex-col gap-9">
      <div>
        <h3 className="text-xl font-semibold">Academic Background</h3>
        <AcademicBackground academicBackground={cv.academicBackground} />
      </div>
      <div>
        <h3 className="text-xl font-semibold">Work Experience</h3>
        <WorkExperience workExperience={cv.workExperience} />
      </div>
      <div>
        <h3 className="text-xl font-semibold">Projects</h3>
        <Projects projects={cv.projects} />
      </div>
      <div>
        <h3 className="text-xl font-semibold">Skills</h3>
        <Skills skills={cv.skills} />
      </div>
    </div>
  );
};

export function CVModal({ cv, setCV }) {
  return (
    <Dialog
      open={cv !== null}
      onOpenChange={(open) => {
        if (!open) setCV(null);
      }}
    >
      <DialogContent
        className="no-scrollbar max-h-[90vh] min-w-[50vw] overflow-y-scroll pt-0"
        noX={true}
      >
        {cv && (
          <>
            <DialogHeader className="sticky top-0 z-20 w-full bg-white pb-2 pt-10">
              <CVModalHeader cv={cv} />

              <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </DialogHeader>
            <CVModalContent cv={cv} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
