import sanityClient from "@/sanity/client";
import { q } from "groqd";
import { notFound } from "next/navigation";
import authorFragment from "@/utils/fragments/author";
import { cache } from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Swiper from "@/components/Swiper";

const client = sanityClient({ useCdn: true });

const builder = imageUrlBuilder(client);

const getAuthorBySlug = cache(async (slug: string) => {
  try {
    const { query, schema } = q("*")
      .filterByType("author")
      .filter(`slug.current == "${slug}"`)
      .filter(`!(_id in path("drafts.**"))`)
      .slice(0)
      .grab(authorFragment);
    return schema.parse(await client.fetch(query));
  } catch (err) {
    console.error(
      "there was an issue getting the data for the following author",
      `"${slug}"`,
      { err }
    );
    return notFound();
  }
});

export type Author = Awaited<ReturnType<typeof getAuthorBySlug>>;

export async function generateStaticParams() {
  try {
    const client = sanityClient({ useCdn: false });
    const { query, schema } = q("*")
      .filterByType("author")
      .filter(`!(_id in path("drafts.**"))`)
      .grab({
        slug: q.slug("slug"),
      });
    return schema.parse(await client.fetch(query));
  } catch (err) {
    console.error(
      "there was an error getting the author slugs statically:",
      err
    );
    return [];
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const author = await getAuthorBySlug(params.slug);
  return (
    <div className="text-slate-200 mb-10">
      <section className="sm:mt-40 mt-20 max-w-[800px] mx-auto">
        <div className="px-4">
          <div className="space-y-4">
            {author.image && (
              <Image
                src={builder.image(author.image).url()}
                alt={`${author.name} Profile Photo`}
                width={120}
                height={120}
                className="rounded-[50%]"
              />
            )}
            <div className="flex justify-between gap-2">
              <h1 className="sm:text-4xl text-3xl">{author.name}</h1>{" "}
              {author?.website && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        className="text-white hover:bg-slate-200 hover:bg-opacity-30 h-8 w-8 flex items-center justify-center rounded-md"
                        href={author.website}
                        target="_blank">
                        <ExternalLinkIcon />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>{`${author.name} Website`}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
          <section className="mt-20">
            <h2 className="text-2xl mb-2">About</h2>
            <div className="space-y-4 leading-8">
              {author.bio && <PortableText value={author.bio} />}
            </div>
          </section>
        </div>
        <section className="mt-20">
          <h2 className="text-2xl mb-2 px-4">Books</h2>
          {author.books && <Swiper books={author.books} />}
        </section>
      </section>
    </div>
  );
}
