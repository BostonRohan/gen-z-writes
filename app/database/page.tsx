import sanityClient from "@/sanity/client";
import { q } from "groqd";
import { notFound } from "next/navigation";
import videoFragment from "@/utils/fragments/video";
import VideoGrid from "@/components/VideoGrid";
import Footer from "@/components/Footer";

const client = sanityClient({ useCdn: true });

async function getVideos() {
  try {
    const { query, schema } = q("*")
      .filterByType("video")
      .filter(`!(_id in path("drafts.**"))`)
      .order("_createdAt desc")
      .grab(videoFragment);
    return schema.parse(await client.fetch(query));
  } catch (err) {
    console.error("there was an error getting the videos err:", err);
    return notFound();
  }
}

export default async function Page() {
  const videos = await getVideos();
  return (
    <>
      <VideoGrid videos={videos} />
      <Footer />
    </>
  );
}
