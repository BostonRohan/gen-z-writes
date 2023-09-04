"use client";

import { ChangeEvent, useState } from "react";
import VideoCard, { Author } from "./VideoCard";
import SearchInput from "./SearchInput";
import { inter } from "../app/fonts";

const VideoGrid = ({ rows }: { rows: Video[] }) => {
  const [videos, setVideos] = useState(rows);

  const searchCriteria = (searchTerm: string, input: string) => {
    searchTerm = searchTerm?.toLowerCase().replace(/[^0-9a-z]/gi, "");
    return searchTerm?.startsWith(input) || searchTerm?.includes(input);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredVideos = rows.filter((video) => {
      const searchInput = e.target.value
        .toLowerCase()
        .replace(/^[ ]+|[ ]+$/g, "")
        .replace(/[^0-9a-z]/gi, "");

      //search by title, author or genre/type
      return (
        searchCriteria(video.data.title, searchInput) ||
        searchCriteria(video.data.author.data.name, searchInput) ||
        searchCriteria(video.data.type, searchInput)
      );
    });

    setVideos(filteredVideos);
  };

  return (
    <>
      <SearchInput handleSearch={handleSearch} />
      {!videos.length && (
        <h1
          className={`${inter.className} font-bold text-3xl text-white text-center`}
        >
          No Results Found
        </h1>
      )}
      <section className="text-white grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 p-4 place-items-center min-h-[50vh] sm:mb-32 mb-64">
        {!!videos.length &&
          videos.map(
            (video, i) =>
              video.data?.link && (
                <VideoCard
                  loadImages={i < 2 ? "eager" : "lazy"}
                  author={video.data.author}
                  key={video.id}
                  video={video}
                  videoWidth={450}
                  videoHeight={338}
                />
              )
          )}
      </section>
    </>
  );
};

export default VideoGrid;
