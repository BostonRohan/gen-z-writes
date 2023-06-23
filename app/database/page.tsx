async function getVideos() {
  const res = await fetch(
    `https://studio.plasmic.app/api/v1/cms/databases/${process.env.NEXT_PUBLIC_CMS_ID}/tables/videos/query`,
    {
      ...(process.env.VIDEOS_CACHE_TAG && {
        next: { tags: [process.env.VIDEOS_CACHE_TAG] },
      }),
      headers: {
        "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN}`,
      },
    }
  );

  const videos = await res.json();

  for (let i = 0; i < videos.rows.length; i++) {
    try {
      const authorRes = await getAuthorById(videos.rows[i].data.author);
      const author = await authorRes.json();
      videos.rows[i].data.author = author.rows[0];
    } catch (err) {
      console.error(
        `there was an error getting data for author id: ${videos.rows[i].data.author}`
      );
    }
  }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return videos;
}

import VideoGrid from "@/components/VideoGrid";
import { Video } from "@/components/VideoGrid";
import getAuthorById from "@/utils/getAuthorById";

export default async function Page() {
  const { rows }: { rows: Video[] } = await getVideos();

  return <VideoGrid rows={rows} />;
}
