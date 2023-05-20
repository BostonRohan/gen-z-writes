async function getVideo(slug: string) {
  const res = await getVideoByTitle(slug);

  if (!res.ok) {
    console.error(res);
    throw new Error(`Failed to fetch data for ${slug}`);
  }
  return await res.json();
}

export async function generateStaticParams() {
  const videos = await fetch(
    `https://studio.plasmic.app/api/v1/cms/databases/${process.env.NEXT_PUBLIC_CMS_ID}/tables/videos/query`,
    {
      headers: {
        "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      throw new Error("Failed to generate videos slugs");
    });

  return videos.rows.map((video: Video) => ({
    //remove non alphanumeric, replace spaces with dashes
    slug: video.data.title
      .trim()
      .replace(/[^\w\s]/gi, "")
      .toLowerCase()
      .replace(/\s/gi, "-"),
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const res = await getVideoByTitle(params.slug)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      throw new Error(
        `there was an error generating the page metadata for ${params.slug} `
      );
    });

  const video: Video = res.rows[0];

  const youtubeId = getYoutubeId(video.data.link);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: video.data.title,
    openGraph: {
      title: video.data.title,
      images: [
        `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg`,
        ...previousImages,
      ],
    },
  };
}

import { Metadata, ResolvingMetadata } from "next";
import { Video } from "@/components/VideoGrid";
import { PageProps } from "@/.next/types/app/database/page";
import VideoCard from "@/components/VideoCard";
import getYoutubeId from "@/utils/getYoutubeId";
import getVideoByTitle from "@/utils/getVideoByTitle";

export default async function Page({ params }: PageProps) {
  const video = await getVideo(params.slug);

  return (
    <section>
      <VideoCard video={video.rows[0]} />
    </section>
  );
}
