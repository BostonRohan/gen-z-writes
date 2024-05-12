import { NextRequest, NextResponse } from "next/server";
import { getVideos } from "@/app/database/page";
import getYoutubeId from "@/utils/getYoutubeId";
import client from "@/sanity/client";
import moment from "moment";
import "moment-duration-format";

export async function GET(_request: NextRequest) {
  if (process.env.YOUTUBE_API_KEY === undefined) {
    console.error("YOUTUBE_API_KEY is not set");
    throw new Error("Unauthorized");
  }

  const videos = await getVideos();

  for (const video of videos) {
    const youtubeVideoId = getYoutubeId(video.url);

    const youtubeRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${youtubeVideoId}&key=${process.env.YOUTUBE_API_KEY}`,
    );

    if (!youtubeRes.ok) {
      console.error(
        `Failed to fetch video statistics for video: ${video.title} \n Response: ${youtubeRes.statusText}`,
      );
    }

    let youtubeData = await youtubeRes.json();

    //we're getting the video by id so only one video will be returned
    let statistics = youtubeData.items[0].statistics;
    let videoDurationRes = youtubeData.items[0].contentDetails.duration;
    let videoDuration = moment
      .duration(videoDurationRes)
      .format("h:mm:ss")
      .padStart(4, "0:0");

    try {
      await client
        .patch(video._id)
        .set({
          views: statistics.viewCount,
          videoDuration,
        })
        .commit();
      console.log(`Video ${video.title} updated`);
    } catch (err) {
      console.error(
        `Failed to update video statistics for video: ${video.title} \n Error: ${err}`,
      );
    }
  }
  return NextResponse.json({ success: true });
}
