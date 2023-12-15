"use client";

import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { navbarLinks } from "@/constants/navbarLinks";
import NavbarLinkComponent from "./NavbarLink";
import NavbarProfileLink from "./NavbarProfileLink";

const NavContent = () => {
  return (
    <>
      {navbarLinks.map((item) => {
        return (
          <NavbarLinkComponent
            navLink={item}
            isMobile={false}
            key={item.name}
          />
        );
      })}
    </>
  );
};

const NavbarMain: React.FC = () => {
  return (
    <NavigationMenu.Root className="flex list-none items-center gap-5 bg-blue-4 px-10 text-xl leading-[6rem] text-white max-md:hidden">
      <div className="relative cursor-default text-[2rem]">
        <NavigationMenu.Link href="/">HiringSystem</NavigationMenu.Link>
      </div>
      <div className="w-full">
        <NavigationMenu.List className="flex items-center self-start">
          <NavContent />
          <NavbarProfileLink isMobile={false}/>
        </NavigationMenu.List>
      </div>
    </NavigationMenu.Root>
  );
};

export default NavbarMain;
