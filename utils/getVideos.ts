import { q } from "groqd";
import { notFound } from "next/navigation";
import videoFragment from "@/utils/fragments/video";
import { sanityFetch } from "@/sanity/fetch";

export default async function getVideos() {
  try {
    const { query, schema } = q("*")
      .filterByType("video")
      .filter(`!(_id in path("drafts.**"))`)
      .order("_createdAt desc")
      .grab(videoFragment);
    return schema.parse(await sanityFetch({ query, tags: ["video"] }));
  } catch (err) {
    console.error("there was an error getting the videos err:", err);
    return notFound();
  }
}
