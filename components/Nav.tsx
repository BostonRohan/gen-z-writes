"use client";
import Link from "next/link";
import { DatabaseIcon, LibraryBigIcon, PenLine } from "lucide-react";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const Nav = () => {
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

  const rootPath = pathname.split("/").at(1);

  const stickyNav = rootPath !== "author" && rootPath !== "ruby-seidner";

  return (
    <>
      <nav
        className={classNames("z-20 font-semibold w-full top-0 h-14", {
          sticky: stickyNav,
        })}
      >
        <div className="w-full bg-paper/90 transition-all backdrop-blur-sm border-b border-ink/10 p-1 h-full mx-auto flex items-center">
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
              className="flex items-center gap-2 text-ink hover:text-brandPrimary transition-colors"
              onClick={() => setOpen(false)}
              href="/"
            >
              <PenLine className="w-5 h-5" />
              <span className="font-handwriting text-xl">Gen Z Writes</span>
            </Link>
            <div className="mr-auto flex gap-1">
              <Link
                onClick={() => setOpen(false)}
                aria-label="Database"
                href="/database"
                className="items-center gap-2 text-ink hover:bg-ink/5 p-1.5 rounded-md sm:flex hidden transition-colors"
              >
                <DatabaseIcon className="w-5 h-5" />
                Database
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/resources"
                className="sm:inline-flex hidden group"
              >
                <div className="items-center gap-2 mr-auto text-ink group-hover:bg-ink/5 p-1.5 rounded-md flex transition-colors">
                  <LibraryBigIcon className="w-5 h-5" />
                  Resources
                </div>
              </Link>
            </div>
            <div className="sm:hidden inline ml-auto">
              <Hamburger
                size={24}
                toggled={isOpen}
                toggle={setOpen}
                color="#2C1810"
                label="Show Menu"
              />
            </div>
          </div>
        </div>
      </nav>
      <div
        className={classNames(
          "transition-all hidden font-semibold bg-paper/95 backdrop-blur-sm",
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
            className="items-center gap-2 mr-auto text-ink hover:bg-ink/5 p-1.5 rounded-md sm:hidden flex"
          >
            <DatabaseIcon className="w-5 h-5" />
            Database
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/resources"
            className="sm:hidden inline-flex group w-fit"
          >
            <div className="items-center gap-2 mr-auto text-ink group-hover:bg-ink/5 p-1.5 rounded-md flex">
              <LibraryBigIcon className="w-5 h-5" />
              Resources
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
