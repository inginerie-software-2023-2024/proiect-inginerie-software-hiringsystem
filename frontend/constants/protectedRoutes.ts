export interface RouteOptions {
  pathname: string;
  pathnameValidator?: (pathname: string) => boolean;
  requirements: "authenticated" | "non-authenticated" | string[];
  rejectOption: "login" | "forbidden"; // doar pentru authenticated
  forbiddenMessage?: string; // doar pentru forbidden
}

export interface ForbiddenRoute {
  forbidden: string;
  forbiddenArgs: string;
}

export interface RedirectRoute {
  route: string;
}

const routeOptions: RouteOptions[] = [
  {
    pathname: "/login",
    requirements: "non-authenticated",
    rejectOption: "forbidden",
  },
  {
    pathname: "/register",
    requirements: "non-authenticated",
    rejectOption: "forbidden",
  },
  {
    pathname: "/applications/me",
    requirements: ["candidate"],
    rejectOption: "forbidden",
    forbiddenMessage: "Only candidates can see this page.",
  },
  {
    pathname: "/interviews/create",
    requirements: ["interviewer", "manager"],
    rejectOption: "forbidden",
    forbiddenMessage: "Only interviewers and managers can see this page.",
  },
  {
    pathname: "/interviews/me",
    requirements: "authenticated",
    rejectOption: "login",
  },
  {
    pathname: "/interviews/room/...",
    pathnameValidator: (pathname) => pathname.startsWith("/interviews/room/"),
    requirements: "authenticated",
    rejectOption: "forbidden",
  },
  {
    pathname: "/interviews/schedule/...",
    pathnameValidator: (pathname) =>
      pathname.startsWith("/interviews/schedule/"),
    requirements: ["candidate"],
    rejectOption: "forbidden",
    forbiddenMessage: "Only candidates can schedule slots.",
  },
  {
    pathname: "/interviews/slots/...",
    pathnameValidator: (pathname) => pathname.startsWith("/interviews/slots/"),
    requirements: ["interviewer", "manager"],
    rejectOption: "forbidden",
    forbiddenMessage: "Only interviewers and managers can see this page.",
  },
  {
    pathname: "/profile/me",
    requirements: "authenticated",
    rejectOption: "login",
  },
];

export default routeOptions;
