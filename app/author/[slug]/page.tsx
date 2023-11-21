import sanityClient from "@/sanity/client";
import { q } from "groqd";
import { notFound } from "next/navigation";
import authorFragment from "@/utils/fragments/author";
import { cache } from "react";
import { Metadata, ResolvingMetadata } from "next";
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
import dynamic from "next/dynamic";
import ShareButton from "@/components/global/ShareButton";
import shortenDescription from "@/utils/shortenDescription";
import TopHeader from "@/components/author/TopHeader";

const Swiper = dynamic(() => import("@/components/Swiper"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-row gap-6 pl-4">
      <div className="rounded-md aspect-[5/8] bg-slate-200 animate-pulse w-[180px] h-[280px] block relative" />
      <div className="rounded-md aspect-[5/8] bg-slate-200 animate-pulse w-[180px] h-[280px] block relative" />
      <div className="rounded-md aspect-[5/8] bg-slate-200 animate-pulse w-[180px] h-[280px] block relative" />
    </div>
  ),
});

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

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const author = await getAuthorBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const images = author?.image
    ? [builder.image(author.image).url(), ...previousImages]
    : [...previousImages];

  //use the first paragraph of the bio to create the description
  const description = author?.bio
    ? shortenDescription(author.bio[0].children[0].text, 160)
    : (await parent).description;

  return {
    title: author.name,
    ...(description && { description }),
    openGraph: {
      images,
      url: `https://www.projectgenzwrites.com/author/${slug}`,
      title: author.name,
      ...(description && { description }),
    },
    twitter: {
      images,
      title: author.name,
      ...(description && { description }),
    },
  };
}

export default async function Page({ params }: Props) {
  const author = await getAuthorBySlug(params.slug);
  const description = author?.bio
    ? shortenDescription(author.bio[0].children[0].text, 160)
    : author.name;

  return (
    <>
      <TopHeader
        src={author?.image ? builder.image(author.image).url() : undefined}
        name={author.name}
        description={description}
        slug={params.slug}
      />
      <div className="text-slate-200 mb-10">
        <section className="sm:mt-40 mt-20 max-w-[800px] mx-auto">
          <div className="px-4">
            <div className="space-y-4">
              {author.image && (
                <Image
                  src={builder.image(author.image).url()}
                  alt={author.name}
                  width={120}
                  height={120}
                  className="rounded-[50%]"
                />
              )}
              <div className="flex justify-between gap-2">
                <h1 className="sm:text-4xl text-3xl">{author.name}</h1>{" "}
                <div className="flex items-center gap-4">
                  {author?.website && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={author.website} target="_blank">
                            <div className="flex flex-col items-center">
                              <ExternalLinkIcon className="text-white hover:bg-slate-200 hover:bg-opacity-30 p-1 h-8 w-8 flex items-center justify-center rounded-md" />
                              <span className="text-xs">Website</span>
                            </div>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>{`${author.name} Website`}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <ShareButton
                          title={author.name}
                          slug={author.slug}
                          text={description}
                        />
                      </TooltipTrigger>
                      <TooltipContent>Share</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            <section className="mt-16">
              <h2 className="text-2xl mb-2">About</h2>
              <div className="space-y-4 leading-8">
                {author.bio && <PortableText value={author.bio} />}
              </div>
            </section>
          </div>
          <section className="mt-16">
            <h2 className="text-2xl mb-2 px-4">Books</h2>
            {author.books && <Swiper books={author.books} />}
          </section>
        </section>
      </div>
    </>
  );
}
