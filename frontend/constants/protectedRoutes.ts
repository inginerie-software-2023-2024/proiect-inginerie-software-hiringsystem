export interface RouteOptions {
  pathname: string;
  pathnameValidator?: (pathname: string) => boolean;
  requirements: "authenticated" | "non-authenticated" | [string];
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
    pathname: "/test",
    requirements: "non-authenticated",
    rejectOption: "forbidden",
    forbiddenMessage: "You are not allowed here.",
  },
];

export default routeOptions;
