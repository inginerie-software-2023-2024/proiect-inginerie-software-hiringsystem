import routeOptions, {
  ForbiddenRoute,
  RedirectRoute,
  RouteOptions,
} from "@/constants/protectedRoutes";
import { SessionData } from "@/types/session";

const generateRedirectLogin = (): RedirectRoute => {
  return {
    route: "/login",
  };
};

const generateForbidden = (arg: string | JSON): ForbiddenRoute => {
  return {
    forbidden: "/forbidden",
    forbiddenArgs: typeof arg === "string" ? arg : JSON.stringify(arg),
  };
};

const findProtectedRoute = (pathname: string) => {
  for (const route of routeOptions) {
    if (route.pathnameValidator) {
      if (route.pathnameValidator(pathname)) {
        return route;
      }
    }

    if (route.pathname === pathname) return route;
  }
};

const applyingProtection = async (route: RouteOptions, sessionFetcher: () => Promise<SessionData>) => {
    const session = await sessionFetcher();
  if (route.requirements === "non-authenticated") {
    if (!session.isLoggedIn) return false;
    return generateForbidden(
      route.forbiddenMessage || "You can not use this page while authenticated."
    );
  }

  if (route.requirements === "authenticated") {
    if (session.isLoggedIn) return;
    if (route.rejectOption === "forbidden")
      return generateForbidden(
        route.forbiddenMessage || "You must be authenticated."
      );

    return generateRedirectLogin();
  }

  if (!session.isLoggedIn) {
    return generateRedirectLogin();
  }

  // este suficient sa ai unul din roluri
  const myRoles = session.roles;
  const roleRequirements: string[] = route.requirements;
  for (const roleRequired of roleRequirements)
    if (myRoles?.includes(roleRequired)) return;

  return generateForbidden(
    route.forbiddenMessage || "You are not allowed here."
  );
};

export const validateProtectedRoute = async (pathname: string, sessionFetcher: () => Promise<SessionData>) => {
  const foundRoute = findProtectedRoute(pathname);
  if (foundRoute) {
    const response = await applyingProtection(foundRoute, sessionFetcher);
    if (response) return response;
  }
};
