"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import classNames from "classnames";
import ShareButton from "@/components/global/ShareButton";

export default function TopHeader({
  src,
  name,
  description,
  slug,
}: {
  src?: string;
  name: string;
  description: string;
  slug: string;
}) {
  const [showHeader, setShowHeader] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 267 && !showHeader) {
        setShowHeader(true);
      }

      if (scrollY < 267 && showHeader) {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showHeader]);

  return (
    <header
      className={classNames(
        "fixed top-0 h-20 bg-gradient-to-b from-neutral-500/80 text-white to-background-primary/80 w-full flex items-center transition-all ease-in-out duration-200",
        { "opacity-0 !h-0": !showHeader }
      )}>
      <div className="px-4 flex justify-between w-full max-w-[800px] mx-auto">
        <div className="flex gap-2 items-center">
          {src && (
            <div className="rounded-[50%] w-[50px] h-[50px] relative">
              <Image
                src={src}
                alt={name}
                fill
                className="object-cover absolute rounded-[50%]"
              />
            </div>
          )}
          <h2 className="text-slate-200 font-semibold">{name}</h2>
        </div>
        <ShareButton title={name} text={description} slug={slug} />
      </div>
    </header>
  );
}
