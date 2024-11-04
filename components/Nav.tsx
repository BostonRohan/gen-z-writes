"use client";
import Link from "next/link";
import { DatabaseIcon, LibraryBigIcon } from "lucide-react";
// import ProfileImage from "./profile/ProfileImage";
// import { useSession } from "next-auth/react";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const Nav = () => {
  // const { data, status } = useSession();
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 640 && isOpen) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);
  return (
    <>
      <nav
        className={classNames("z-20 font-semibold w-full top-0 h-14", {
          sticky: pathname.split("/")[1] !== "author",
        })}
      >
        <div className="w-full bg-background/85 transition-all backdrop-blur-sm p-1 h-full mx-auto flex items-center">
          <div
            className={classNames(
              "max-w-4xl",
              {
                "xl:max-w-[1829px] md:max-w-[1100px] md:px-6 max-w-none":
                  pathname === "/database",
              },
              "mx-auto flex items-center gap-8 w-full px-4 z-20",
            )}
          >
            <Link
              aria-label="Home"
              className="opacity-40 xs:text-base text-sm"
              onClick={() => setOpen(false)}
              href="/"
            >
              Project Gen Z Writes
            </Link>
            <div className="mr-auto flex gap-1">
              <Link
                onClick={() => setOpen(false)}
                aria-label="Database"
                href="/database"
                className="items-center gap-2 hover:bg-neutral-700/30 p-1.5 rounded-md sm:flex hidden"
              >
                <DatabaseIcon />
                Database
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/resources"
                className="sm:inline-flex hidden group"
              >
                <div className="items-center gap-2 mr-auto group-hover:bg-neutral-700/30 p-1.5 rounded-md flex">
                  <LibraryBigIcon />
                  Resources
                </div>
                <span className="text-xs text-brandSecondary pl-1">New</span>
              </Link>
            </div>
            {/* {pathname !== "/profile" && ( */}
            {/*   <div className="sm:inline hidden"> */}
            {/*     {status === "loading" ? ( */}
            {/*       <div className="bg-neutral-700 bg-opacity-40 w-[85px] p-2 h-[36px] animate-pulse rounded-md" /> */}
            {/*     ) : ( */}
            {/*       <Link */}
            {/*         onClick={() => setOpen(false)} */}
            {/*         href="/profile" */}
            {/*         aria-label={ */}
            {/*           data?.user */}
            {/*             ? `${data?.user.name ?? data?.user.email} Profile Image` */}
            {/*             : "Profile Icon" */}
            {/*         } */}
            {/*       ></Link> */}
            {/*     )} */}
            {/*   </div> */}
            {/* )} */}
            <div className="sm:hidden inline ml-auto opacity-90">
              <Hamburger
                size={24}
                toggled={isOpen}
                toggle={setOpen}
                color="#e2e8f0"
                label="Show Menu"
              />
            </div>
          </div>
        </div>
      </nav>
      <div
        className={classNames(
          "transition-all hidden font-semibold bg-background/80 backdrop-blur-sm",
          {
            "h-screen w-screen z-20 !inline fixed": isOpen,
          },
        )}
      >
        <div className="px-4 flex gap-4 flex-col pt-4">
          <Link
            onClick={() => setOpen(false)}
            aria-label="Database"
            href="/database"
            className="items-center gap-2 mr-auto hover:bg-neutral-700/30 p-1.5 rounded-md sm:hidden flex opacity-90"
          >
            <DatabaseIcon />
            Database
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/resources"
            className="sm:hidden inline-flex group w-fit"
          >
            <div className="items-center gap-2 mr-auto group-hover:bg-neutral-700/30 p-1.5 rounded-md flex">
              <LibraryBigIcon />
              Resources
            </div>
            <span className="text-xs text-brandSecondary pl-1">New</span>
          </Link>
          {/* <div className="sm:hidden flex gap-4"> */}
          {/*   {status === "loading" ? ( */}
          {/*     <div className="bg-neutral-700 bg-opacity-40 w-[85px] p-2 h-[36px] animate-pulse rounded-md" /> */}
          {/*   ) : ( */}
          {/*     <Link */}
          {/*       href="/profile" */}
          {/*       onClick={() => setOpen(false)} */}
          {/*       aria-label={ */}
          {/*         data?.user */}
          {/*           ? `${data?.user.name ?? data?.user.email} Profile Image` */}
          {/*           : "Profile Icon" */}
          {/*       }> */}
          {/*       {data?.user ? ( */}
          {/*         <div className="flex gap-2 items-center"> */}
          {/*           <ProfileImage */}
          {/*             name={data.user.name} */}
          {/*             email={data.user.email} */}
          {/*             image={data.user.image} */}
          {/*           /> */}
          {/*           <p className="opacity-70">{data?.user?.username}</p> */}
          {/*         </div> */}
          {/*       ) : ( */}
          {/*         <div className="flex items-center gap-2 hover:bg-neutral-700/30 p-1.5 rounded-md"> */}
          {/*           <UserIcon /> Login */}
          {/*         </div> */}
          {/*       )} */}
          {/*     </Link> */}
          {/*   )} */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Nav;
