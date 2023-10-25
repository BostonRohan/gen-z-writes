import { Metadata } from "next";
import VideoCard from "@/components/VideoCard";
import sanityClient from "@/sanity/client";
import { q } from "groqd";
import { cache } from "react";
import { notFound } from "next/navigation";
import getYoutubeId from "@/utils/getYoutubeId";
import videoFragment from "@/utils/fragments/video";

const client = sanityClient({ useCdn: true });

const getVideoBySlug = cache(async (slug: string) => {
  try {
    const { query, schema } = q("*")
      .filterByType("video")
      .filter(`slug.current == "${slug}"`)
      .filter(`!(_id in path("drafts.**"))`)
      .slice(0)
      .grab(videoFragment);
    return schema.parse(await client.fetch(query));
  } catch (err) {
    console.error(
      "there was an issue getting the data for the following video",
      `"${slug}"`,
      "err:",
      err
    );
    return notFound();
  }
});

export type Video = Awaited<ReturnType<typeof getVideoBySlug>>;

export async function generateStaticParams() {
  try {
    const client = sanityClient({ useCdn: false });
    const { query, schema } = q("*")
      .filterByType("video")
      .filter(`!(_id in path("drafts.**"))`)
      .grab({
        slug: q.slug("slug"),
      });
    return schema.parse(await client.fetch(query));
  } catch (err) {
    console.error(
      "there was an error getting the video slugs statically:",
      err
    );
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { title, url, author, tags } = await getVideoBySlug(params.slug);

  const youtubeId = getYoutubeId(url);

  const intlFormat = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });

  const description = `Explore, learn, and be inspired by '${title},' a captivating video by author ${
    author.name
  }. Delve into the world of ${intlFormat.format(
    tags
  )} as the author shares expertise and insights. Gain valuable knowledge and creative inspiration from this engaging multimedia experience.`;

  const images = [
    { url: `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg` },
  ];

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
      url: `https://www.projectgenzwrites.com/database/videos/${params.slug}`,
      images,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const video = await getVideoBySlug(params.slug);

  return (
    <section className="sm:min-h-[750px] min-h-[650px] px-4">
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
