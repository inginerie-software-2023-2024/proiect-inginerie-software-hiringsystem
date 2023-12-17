import { NavbarLink } from "@/types/NavbarLink";

export const navbarLinks : NavbarLink[] = [
    {
        name: "Jobs",
        clickUrl: "/jobs",
        options: [
            {
                title: "View all jobs",
                description: "A list of the available jobs our company offers.",
                url: "/jobs"
            }
        ]
    },
    {
        name: "Applications",
        clickUrl: "/applications/me",
        options: [
            {
                title: "View your applications",
                description: "View how your job applications are going.",
                url: "/applications/me",
                restricted_to_roles: ['candidate']
            },
            {
                title: "Nothing here",
                description: "You must be logged in to access this section.",
                url: "/applications/me",
                restricted_to_roles: ['anonymous']
            }
        ]
    },
    {
        name: "Interviews",
        clickUrl: "/interviews/me",
        options: [
            {
                title: "View your interviews",
                description: "View the interviews you have been scheduled for.",
                url: "/interviews/me",
            },
            {
                title: "View your interviews",
                description: "You must be logged in to access this section.",
                url: "/interviews/me",
                restricted_to_roles: ['anonymous']
            }
        ]
    }
]
