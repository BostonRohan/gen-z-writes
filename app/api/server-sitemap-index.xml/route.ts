import sanityClient from "@/sanity/client";
import { q } from "groqd";
import { getServerSideSitemapIndex } from "next-sitemap";

export async function GET(_request: Request) {
  const client = sanityClient({ useCdn: false });
  const { query, schema } = q("*")
    .filterByType("video")
    .grab({
      slug: q.slug("slug"),
    });

  return getServerSideSitemapIndex(
    schema
      .parse(await client.fetch(query))
      .map(({ slug }) => `/database/videos/${slug}`)
  );
}
