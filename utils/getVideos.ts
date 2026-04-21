import { notFound } from "next/navigation";
import { q } from "@/sanity/groqd";
import videoFragment from "@/utils/fragments/video";
import { runQuery } from "@/sanity/client";

export default async function getVideos() {
  try {
    const query = q.star
      .filterByType("video")
      .filterRaw(`!(_id in path("drafts.**"))`)
      .order("_createdAt desc")
      .project(videoFragment);

    return await runQuery(query, { tags: ["video"] });
  } catch (err) {
    console.error("there was an error getting the videos err:", err);
    return notFound();
  }
}
