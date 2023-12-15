// 'use client'

import React from "react";
import { Menu as HamburgerIcon } from "lucide-react";
import {
  SideDialog,
  SideDialogContent,
  SideDialogDescription,
  SideDialogHeader,
  SideDialogTitle,
  SideDialogTrigger,
} from "@/components/dialog/SideDialog";
import { navbarLinks } from "@/constants/navbarLinks";
import NavbarLinkComponent from "./NavbarLink";
import NavbarProfileLink from "./NavbarProfileLink";

const NavContent = () => {
  return (
    <>
      <NavbarProfileLink isMobile={true} />
      <section className="flex h-full flex-col gap-6 pt-16">
        {navbarLinks.map((item) => {
          return (
            <NavbarLinkComponent
              navLink={item}
              isMobile={true}
              key={item.name}
            />
          );
        })}
      </section>
    </>
  );
};

const SideNavbarDialog = () => {
  return (
    <SideDialog>
      <SideDialogTrigger className="ml-auto">
        <HamburgerIcon className="h-10 w-10" />
      </SideDialogTrigger>
      <SideDialogContent className="no-scrollbar overflow-y-scroll">
        <SideDialogHeader>
          <SideDialogTitle>HiringSystem</SideDialogTitle>
          <SideDialogDescription>Available actions</SideDialogDescription>
        </SideDialogHeader>
        <NavContent />
      </SideDialogContent>
    </SideDialog>
  );
};

const NavbarMobile = () => {
  return (
    <nav className="flex list-none items-center gap-5 bg-blue-4 px-10 text-xl leading-[6rem] text-white md:hidden">
      <div className="relative cursor-default text-[2rem]">HiringSystem</div>
      <SideNavbarDialog />
    </nav>
  );
};

export default NavbarMobile;
