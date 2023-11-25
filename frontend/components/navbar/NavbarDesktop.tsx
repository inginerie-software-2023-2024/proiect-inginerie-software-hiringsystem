"use client";

import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { navbarLinks } from "@/constants/navbar-links";
import NavbarLinkComponent from "./NavbarLink";

const NavContent = () => {
  return (
    <>
      {navbarLinks.map((item) => {
        return (
          <NavbarLinkComponent navLink={item} isMobile={false} key={item.name} />
        );
      })}
    </>
  );
};

const NavItem: React.FC<{ name: string; className?: string }> = ({
  name,
  className,
}) => {
  return (
    <NavigationMenu.Item className={className}>
      <NavigationMenu.Trigger>{name}</NavigationMenu.Trigger>
      <NavigationMenu.Content className="relative w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52">
        <ul className="absolute m-0 grid h-auto list-none gap-x-[10px] rounded-md bg-white p-[22px] text-black shadow-md sm:grid-flow-col sm:grid-rows-3">
          Test
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
};

const NavbarMain: React.FC = () => {
  return (
    <NavigationMenu.Root className="flex list-none items-center gap-5 bg-blue-4 px-10 text-xl leading-[6rem] text-white max-md:hidden">
      <div className="relative cursor-default text-[2rem]">
        <NavigationMenu.Link>HiringSystem</NavigationMenu.Link>
      </div>
      <div className="w-full">
        <NavigationMenu.List className="flex items-center self-start">
          {/* <NavItem name="Jobs" />
          <NavItem name="Applications" />
          <NavItem name="Interviews" /> */}
          <NavContent />
          <NavItem name="Profile" className="ml-auto" />
        </NavigationMenu.List>
      </div>
    </NavigationMenu.Root>
  );
};

export default NavbarMain;
