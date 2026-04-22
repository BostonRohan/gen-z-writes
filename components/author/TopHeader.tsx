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
        "fixed top-0 h-20 bg-paper/95 backdrop-blur-sm z-10 border-b border-ink/10 text-ink w-full flex items-center transition-all ease-in-out duration-200",
        { "opacity-0 !h-0": !showHeader }
      )}
    >
      <div className="px-4 flex justify-between w-full max-w-[800px] mx-auto">
        <div className="flex gap-2 items-center">
          {src && (
            <div className="rounded-full w-[50px] h-[50px] relative border-2 border-paper-dark">
              <Image
                src={src}
                alt={name}
                fill
                sizes="50px"
                className="object-cover absolute rounded-full"
              />
            </div>
          )}
          <h2 className="font-serif font-semibold">{name}</h2>
        </div>
        <ShareButton title={name} text={description} slug={slug} />
      </div>
    </header>
  );
}
