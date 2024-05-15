import { q } from "groqd";
import { notFound } from "next/navigation";
import videoFragment from "@/utils/fragments/video";
import { runQuery } from "@/sanity/client";

export default async function getVideos() {
  try {
    const query = q("*")
      .filterByType("video")
      .filter(`!(_id in path("drafts.**"))`)
      .order("_createdAt desc")
      .grab(videoFragment);

    return await runQuery(query);
  } catch (err) {
    console.error("there was an error getting the videos err:", err);
    return notFound();
  }
}
