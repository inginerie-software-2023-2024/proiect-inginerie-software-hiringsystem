import { NavbarLink } from "@/types/NavbarLink";

export const navbarLinks: NavbarLink[] = [
  {
    name: "Jobs",
    clickUrl: "/jobs",
    options: [
      {
        title: "View all jobs",
        description: "A list of the available jobs our company offers.",
        url: "/jobs",
      },
    ],
  },
  {
    name: "Applications",
    clickUrl: "/applications/me",
    options: [
      {
        title: "View your applications",
        description: "View how your job applications are going.",
        url: "/applications/me",
        restricted_to_roles: ["candidate"],
      },
      {
        title: "No applications",
        description:
          "If you want to view applications for a specific job, enter from the jobs page.",
        url: "/applications/me",
        restricted_to_roles: ["interviewer", "manager"],
      },
      {
        title: "Nothing here",
        description: "You must be logged in to access this section.",
        url: "/applications/me",
        restricted_to_roles: ["anonymous"],
      },
    ],
  },
  {
    name: "Interviews",
    clickUrl: "/interviews/me",
    options: [
      {
        title: "View your interviews",
        description: "View the interviews you have been scheduled for.",
        url: "/interviews/me",
        restricted_to_roles: ["candidate", "interviewer", "manager"],
      },
      {
        title: "Add available slots",
        description:
          "Add time slots for when you are available to hold interviews.",
        url: "/interviews/slots/me",
        restricted_to_roles: ["interviewer", "manager"],
      },
      {
        title: "Nothing here",
        description: "You must be logged in to access this section.",
        url: "/interviews/me",
        restricted_to_roles: ["anonymous"],
      },
    ],
  },
  {
    name: "Candidates",
    options: [
      {
        title: "Manage candidates",
        description:
          "View  and manage the candidates registered on the platform.",
        url: "/candidates",
        restricted_to_roles: ["manager"],
      },
    ],
  },
];
