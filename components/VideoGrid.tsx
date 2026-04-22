"use client";

import { ChangeEvent, useState } from "react";
import VideoCard from "./VideoCard";
import SearchInput from "./SearchInput";
import { Video } from "@/app/database/videos/[slug]/page";
import { BookX } from "lucide-react";

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

      const title = video?.title ?? "";
      const authorName = video?.author?.name ?? "";
      const tags = video?.tags ?? [];

      return (
        searchCriteria(title, searchInput) ||
        searchCriteria(authorName, searchInput) ||
        searchCriteria(tags.join(" "), searchInput)
      );
    });

    setVideosState(filteredVideos);
  };

  return (
    <>
      <SearchInput handleSearch={handleSearch} />
      {!videosState.length && (
        <div className="text-center py-12">
          <BookX className="w-16 h-16 mx-auto text-ink-muted mb-4" />
          <h1 className="font-serif font-bold text-3xl text-ink">
            No Results Found
          </h1>
          <p className="text-ink-muted mt-2">
            Try searching with different keywords
          </p>
        </div>
      )}
      <section className="max-w-[2000px] mx-auto grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-6 p-4 place-items-center">
        {videosState.map(
          (video, i) =>
            video && (
              <VideoCard
                loadImages={i < 3 ? "eager" : "lazy"}
                key={video._id}
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
