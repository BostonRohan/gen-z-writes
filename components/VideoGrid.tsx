"use client";

import { useState } from "react";
import VideoCard from "./VideoCard";
import SearchInput from "./SearchInput";

export interface Video {
  id: string;
  createdAt: string;
  updatedAt: string;
  identifier: string;
  data: {
    title: string;
    link: string;
    type: string;
    author: string;
  };
}

const VideoGrid = ({ rows }: { rows: Video[] }) => {
  return (
    <>
      <SearchInput />
      <main className="text-white grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 p-4 place-items-center">
        {rows.map(
          (video) =>
            video.data?.link && <VideoCard key={video.id} video={video} />
        )}
      </main>
    </>
  );
};

export default VideoGrid;
