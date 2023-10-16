"use client";
import Link from "next/link";
import { HomeIcon, DatabaseIcon, UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { debounce } from "@/utils/debounce";
import ProfileImage from "./profile/ProfileImage";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Nav = () => {
  const [showNav, setShowNav] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { data, status } = useSession();

  const handleScroll = debounce(() => {
    const currentScrollPos = window.scrollY;

    setShowNav(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, showNav, handleScroll]);

  return (
    <nav
      className={`fixed z-10 font-semibold transition-all duration-500 w-full ease-in-out ${
        showNav ? "bottom-10" : "-bottom-20"
      }`}>
      <div className="w-[250px] bg-neutral-800 bg-opacity-60 p-1 mx-auto text-slate-200 rounded-3xl flex items-center justify-center gap-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link
                aria-label="Home"
                href="/"
                className="bg-neutral-700 bg-opacity-40 w-10 p-2 rounded-full flex items-center justify-center hover:bg-opacity-100">
                <HomeIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Home</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Link
                aria-label="Database"
                className="bg-neutral-700 bg-opacity-40 w-10 p-2 rounded-full flex items-center justify-center hover:bg-opacity-100"
                href="/database">
                <DatabaseIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Database</TooltipContent>
          </Tooltip>
          {status === "loading" ? (
            <div className="bg-neutral-700 bg-opacity-40 w-10 p-2 h-10 animate-pulse rounded-full" />
          ) : (
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href="/profile"
                  aria-label={
                    data?.user
                      ? `${data?.user.name ?? data?.user.email} Profile Image`
                      : "Profile Icon"
                  }>
                  {data?.user ? (
                    <ProfileImage
                      name={data.user.name}
                      email={data.user.email}
                      image={data.user.image}
                    />
                  ) : (
                    <div className="bg-neutral-700 bg-opacity-40 p-2 rounded-full flex items-center justify-center hover:bg-opacity-100">
                      <UserIcon />
                    </div>
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent>Profile</TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default Nav;
