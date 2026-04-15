import { Metadata } from "next";
import VideoCard from "@/components/VideoCard";
import { q } from "@/sanity/groqd";
import { cache } from "react";
import { notFound } from "next/navigation";
import getYoutubeId from "@/utils/getYoutubeId";
import videoFragment from "@/utils/fragments/video";
import { runQuery } from "@/sanity/client";

const getVideoBySlug = cache(async (slug: string) => {
  try {
    const query = q
      .parameters<{ slug: string }>()
      .star
      .filterByType("video")
      .filterBy("slug.current == $slug")
      .filterRaw(`!(_id in path("drafts.**"))`)
      .slice(0)
      .project(videoFragment);

    return await runQuery(query, {
      parameters: { slug },
      tags: [`video:${slug}`],
    });
  } catch (err) {
    console.error(
      "there was an issue getting the data for the following video",
      `"${slug}"`,
      "err:",
      err,
    );
    return notFound();
  }
});

export type Video = NonNullable<Awaited<ReturnType<typeof getVideoBySlug>>>;

export async function generateStaticParams() {
  try {
    const query = q.star
      .filterByType("video")
      .filterRaw(`!(_id in path("drafts.**"))`)
      .project({
        slug: true,
      });
    const videos = await runQuery(query);
    return videos
      .map((video) => ({
        slug: (video.slug as { current?: string | null } | null)?.current ?? "",
      }))
      .filter((param) => param.slug !== "");
  } catch (err) {
    console.error(
      "there was an error getting the video slugs statically:",
      err,
    );
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  if (!video) {
    return {};
  }
  const title = video?.title ?? "";
  const url = video?.url ?? "";
  const author = video?.author;
  const tags = video?.tags ?? [];

  const youtubeId = getYoutubeId(url);

  const intlFormat = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });

  const description = `Explore, learn, and be inspired by '${title},' a captivating video by author ${
    author?.name ?? "Unknown"
  }. Delve into the world of ${intlFormat.format(tags ?? [])} as the author shares expertise and insights. Gain valuable knowledge and creative inspiration from this engaging multimedia experience.`;

  const images = [{ url: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` }];

  return {
    title,
    description,
    twitter: {
      images,
      card: "summary",
      title,
      description,
    },
    openGraph: {
      title,
      description,
      url: `https://www.projectgenzwrites.com/database/videos/${slug}`,
      images,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  if (!video) {
    notFound();
  }

  return (
    <section className="py-16 px-4">
      <VideoCard
        video={video}
        cardClassName="max-w-[800px] mx-auto"
        videoHeight={600}
        videoWidth={800}
        showVideo={true}
        thumbnailIconClassName="!left-[40%]"
      />
    </section>
  );
}
