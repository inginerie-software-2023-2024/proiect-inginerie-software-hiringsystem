"use client";

import useAuth from "@/hooks/useAuth";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavbarProfileLinkMobile = () => {
  const { session, logout } = useAuth();

  if (!session.isLoggedIn) return <Link href="/login">Login</Link>;

  return (
    <div className="mt-7 flex justify-between">
      <Link
        href="/profile/me"
        className="ml-0 inline-flex items-center justify-center gap-3"
      >
        <UserIcon className="h-[2rem] w-auto" />
        <div className="flex flex-col text-left leading-5">
          <span>{session.email}</span>
          <span className="text-[0.8rem]">View your profile</span>
        </div>
      </Link>

      <button
        onClick={() => logout()}
        className="rounded-lg bg-blue-4 p-4 font-bold text-white"
      >
        Logout
      </button>
    </div>
  );
};

const NavbarProfileLinkDesktop = () => {
  const { session, logout } = useAuth();

  if (!session.isLoggedIn)
    return (
      <NavigationMenu.Item className="ml-auto leading-5">
        <NavigationMenu.Trigger>
          <Link href="/login">Login</Link>
        </NavigationMenu.Trigger>
      </NavigationMenu.Item>
    );

  return (
    <NavigationMenuItem className="ml-auto leading-5">
      <NavigationMenuTrigger>
        <Link
          href="/profile/me"
          className="flex items-center justify-center gap-3"
        >
          <UserIcon className="h-[2rem] w-auto" />
          <div className="flex flex-col text-left leading-5">
            <span>{session.email}</span>
            <span className="text-[0.8rem]">View your profile</span>
          </div>
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent
        asChild
        className="data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52"
      >
        <div className="absolute z-10 m-0 mt-3 flex h-auto flex-col gap-5 rounded-md bg-white p-[22px] text-[15px] text-black shadow-md">
          <span className="text-muted-foreground">
            If you wish to log out click on the following button
          </span>
          <button
            onClick={() => logout()}
            className="rounded-lg bg-blue-4 p-4 font-bold text-white"
          >
            Logout
          </button>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const NavbarProfileLink = ({ isMobile }) => {
  const { session, logout, isLoading } = useAuth();

  if (isLoading) return null;

  if (isMobile) return <NavbarProfileLinkMobile />;

  return <NavbarProfileLinkDesktop />;
};

export default NavbarProfileLink;
