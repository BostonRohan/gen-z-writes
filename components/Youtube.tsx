"use client";

import { useState } from "react";
import Youtube from "react-youtube";
import { YouTubeProps, YouTubeEvent } from "react-youtube";

const YoutubePlayer = ({
  id,
  width,
  height,
}: {
  id: string;
  width: string;
  height: string;
  title: string;
}) => {
  const [loading, setLoading] = useState(true);

  const opts = {
    playerVars: { autoplay: 1, playsinline: true, rel: 0 },
  };

  const onPlayerReady: YouTubeProps["onReady"] = (
    event: YouTubeEvent<HTMLVideoElement>
  ) => {
    if (event) {
      setLoading(false);
    }
  };

  return (
    <div
      className={`aspect-video h-full sm:min-h-[${height}px] ${
        loading ? "bg-[#333337] opacity-50 animate-pulse rounded-xl" : ""
      }`}
    >
      <Youtube
        videoId={id}
        loading="eager"
        onReady={onPlayerReady}
        opts={opts}
        className="h-full"
        iframeClassName={`rounded-xl w-full min-w-[${width}px] h-full`}
      />
    </div>
  );
};

export default YoutubePlayer;
