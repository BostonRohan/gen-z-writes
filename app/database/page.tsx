async function getVideos() {
  const res = await fetch(
    `https://studio.plasmic.app/api/v1/cms/databases/${process.env.NEXT_PUBLIC_CMS_ID}/tables/videos/query`,
    {
      headers: {
        "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

import { Metadata } from "next";
import VideoGrid from "@/components/VideoGrid";
import { Video } from "@/components/VideoGrid";

export const metadata: Metadata = {
  title: "Database",
  description:
    "Explore our collection of videos, our database features a curated selection of videos that cover a wide range of topics, including writing tips, author interviews, and more. Watch and learn from experienced writers in the industry and discover new insights into the craft of writing.",
  creator: "Gen Z Writes",
  category: "Database",
  openGraph: {
    title: "Database",
    description:
      "Explore our collection of videos, our database features a curated selection of videos that cover a wide range of topics, including writing tips, author interviews, and more. Watch and learn from experienced writers in the industry and discover new insights into the craft of writing.",
  },
};

export default async function Page() {
  const { rows }: { rows: Video[] } = await getVideos();

  return <VideoGrid rows={rows} />;
}
