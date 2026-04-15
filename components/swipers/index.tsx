"use client";

import dynamic from "next/dynamic";

const BooksSwiper = dynamic(() => import("./Books"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-row gap-6 pl-4 mt-4">
      <div className="rounded-md aspect-[5/8] bg-slate-200 animate-pulse w-[180px] h-[280px] block relative" />
      <div className="rounded-md aspect-[5/8] bg-slate-200 animate-pulse w-[180px] h-[280px] block relative" />
      <div className="rounded-md aspect-[5/8] bg-slate-200 animate-pulse w-[180px] h-[280px] block relative" />
    </div>
  ),
});

const VideosSwiper = dynamic(() => import("./Videos"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-row gap-6 pl-4 mt-4">
      <div className="rounded-md bg-slate-200 animate-pulse w-[250px] h-[187.5px] block relative" />
      <div className="rounded-md bg-slate-200 animate-pulse w-[250px] h-[187.5px] block relative" />
      <div className="rounded-md bg-slate-200 animate-pulse w-[250px] h-[187.5px] block relative" />
    </div>
  ),
});

export { BooksSwiper, VideosSwiper };
