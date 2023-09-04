"use client";

import { ChangeEvent, useState } from "react";
import VideoCard from "./VideoCard";
import SearchInput from "./SearchInput";
import { inter } from "../app/fonts";
import { Video } from "@/app/database/videos/[slug]/page";

const VideoGrid = ({ videos }: { videos: Video[] }) => {
  const [videosState, setVideosState] = useState(videos);

  const searchCriteria = (searchTerm: string, input: string) => {
    searchTerm = searchTerm?.toLowerCase().replace(/[^0-9a-z]/gi, "");
    return searchTerm?.startsWith(input) || searchTerm?.includes(input);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredVideos = videos.filter((video: Video) => {
      const searchInput = e.target.value
        .toLowerCase()
        .replace(/^[ ]+|[ ]+$/g, "")
        .replace(/[^0-9a-z]/gi, "");

      //search by title, author or genre/type
      return (
        searchCriteria(video.title, searchInput) ||
        searchCriteria(video.author.name, searchInput) ||
        searchCriteria(video.tags.join(" "), searchInput)
      );
    });

    setVideosState(filteredVideos);
  };

  return (
    <>
      <SearchInput handleSearch={handleSearch} />
      {!videosState.length && (
        <h1
          className={`${inter.className} font-bold text-3xl text-white text-center`}
        >
          No Results Found
        </h1>
      )}
      <section className="text-white grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 p-4 place-items-center min-h-[50vh] sm:mb-32 mb-64">
        {videosState.map((video, i) => (
          <VideoCard
            loadImages={i < 3 ? "eager" : "lazy"}
            key={video._id}
            video={video}
            videoWidth={450}
            videoHeight={338}
          />
        ))}
      </section>
    </>
  );
};

export default VideoGrid;
