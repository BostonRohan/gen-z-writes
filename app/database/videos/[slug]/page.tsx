async function getVideo(slug: string) {
  const res = await getVideoBySlug(slug);

  const video = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to fetch data for ${slug}`);
  }
  return video;
}

async function getAuthor(id: string) {
  const res = await getAuthorById(id);

  const author = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to fetch data for author with the id of: ${id}`);
  }
  return author;
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

  return videos.rows.map((video: Video) => {
    if (video.data.link) {
      return { slug: video.data.slug };
    }
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const res = await getVideoBySlug(params.slug)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      throw new Error(
        `there was an error generating the page metadata for ${params.slug} `
      );
    });

  const video: Video = res.rows[0];

  const youtubeId = getYoutubeId(video.data.link);

  return {
    title: video.data.title,
    openGraph: {
      title: video.data.title,
      images: [
        { url: `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg` },
      ],
    },
  };
}

import { Metadata } from "next";
import { Video } from "@/components/VideoGrid";
import { PageProps } from "@/.next/types/app/database/page";
import VideoCard from "@/components/VideoCard";
import getYoutubeId from "@/utils/getYoutubeId";
import getVideoBySlug from "@/utils/getVideoBySlug";
import getAuthorById from "@/utils/getAuthorById";

export default async function Page({ params }: PageProps) {
  const video = await getVideo(params.slug);
  const author = await getAuthor(video.rows[0].data.author);

  return (
    <section className="sm:min-h-[750px] min-h-[650px] px-4">
      <VideoCard
        author={author.rows[0]}
        video={video.rows[0]}
        cardClassName="max-w-[800px] mx-auto"
        videoHeight={600}
        videoWidth={800}
        showVideo={true}
        thumbnailIconClassName="!left-[40%]"
      />
    </section>
  );
}
