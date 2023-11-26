"use client";

import { NavbarLink, NavbarLinkOption } from "@/types/NavbarLink";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import React from "react";

interface NavbarLinkParams {
  urlToSet: string | null;
  filteredOptions: NavbarLinkOption[];
  name: string;
}

const BaseOfLink: React.FC<{
  url: string | null;
  name: string;
  className?: string;
}> = ({ url, name, className }) => {
  if (url === null) {
    return <div className={className}>{name}</div>;
  }

  return (
    <Link href={url} className={className}>
      {name}
    </Link>
  );
};

const OptionsOfLink: React.FC<{ filteredOptions: NavbarLinkOption[] }> = ({
  filteredOptions,
}) => {
  console.log(filteredOptions);
  return (
    <>
      {filteredOptions.map((option, index) => {
        return (
          <Link
            href={option.url}
            key={index}
            className="flex flex-col gap-3 rounded p-4 text-muted-foreground shadow-md md:leading-normal md:shadow-sm md:shadow-blue-1"
          >
            <span className="md:font-bold">{option.title}</span>
            <p>{option.description}</p>
          </Link>
        );
      })}
    </>
  );
};

const NavbarLinkMobile: React.FC<NavbarLinkParams> = ({
  urlToSet,
  filteredOptions,
  name,
}) => {
  return (
    <div>
      <BaseOfLink
        url={urlToSet}
        name={name}
        className="mb-2 block rounded bg-blue-3 px-4 py-2 font-bold text-white hover:bg-blue-2"
      />
      <OptionsOfLink filteredOptions={filteredOptions} />
    </div>
  );
};

const NavbarLinkDesktop: React.FC<NavbarLinkParams> = ({
  urlToSet,
  filteredOptions,
  name,
}) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <BaseOfLink url={urlToSet} name={name} className="px-2" />
      </NavigationMenuTrigger>
      <NavigationMenuContent
        asChild
        className="data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52"
      >
        <div className="absolute z-10 m-0 flex h-auto flex-col gap-5 rounded-md bg-white p-[22px] text-[15px] text-black shadow-md">
          <OptionsOfLink filteredOptions={filteredOptions} />
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const calculateUrl = (
  clickUrl: string | null | undefined,
  filteredOptions: NavbarLinkOption[]
): string | null | undefined => {
  if (clickUrl || clickUrl === null) {
    return clickUrl;
  }

  if (filteredOptions.length === 0) return undefined;

  return filteredOptions[0].url;
};

const NavbarLinkComponent = ({
  isMobile,
  navLink,
}: {
  isMobile: boolean;
  navLink: NavbarLink;
}) => {
  const filteredOptions = navLink.options.filter((option) => {
    if (!option.restricted_to_roles) return true;

    return true;
  });

  const urlToSet = calculateUrl(navLink.clickUrl, filteredOptions);
  if (urlToSet === undefined) return null;

  if (isMobile)
    return (
      <NavbarLinkMobile
        urlToSet={urlToSet}
        filteredOptions={filteredOptions}
        name={navLink.name}
      />
    );

  return (
    <NavbarLinkDesktop
      urlToSet={urlToSet}
      filteredOptions={filteredOptions}
      name={navLink.name}
    />
  );
};

export default NavbarLinkComponent;
