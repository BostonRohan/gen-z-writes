import { q } from "@/sanity/groqd";
import { notFound } from "next/navigation";
import authorFragment from "@/utils/fragments/author";
import { ReactNode, cache } from "react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { createImageUrlBuilder } from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BooksSwiper, VideosSwiper } from "@/components/swipers";
import ShareButton from "@/components/global/ShareButton";
import shortenDescription from "@/utils/shortenDescription";
import TopHeader from "@/components/author/TopHeader";
import Footer from "@/components/Footer";
import { client, runQuery } from "@/sanity/client";

const builder = createImageUrlBuilder(client);

const getAuthorBySlug = cache(async (slug: string) => {
  try {
    const query = q
      .parameters<{ slug: string }>()
      .star
      .filterByType("author")
      .filterBy("slug.current == $slug")
      .filterRaw(`!(_id in path("drafts.**"))`)
      .slice(0)
      .project(authorFragment);

    return await runQuery(query, {
      parameters: { slug },
      tags: [`author:${slug}`],
    });
  } catch (err) {
    console.error(
      "there was an issue getting the data for the following author",
      `"${slug}"`,
      { err },
    );
    return notFound();
  }
});

export type Author = NonNullable<Awaited<ReturnType<typeof getAuthorBySlug>>>;

export async function generateStaticParams() {
  try {
    const query = q.star
      .filterByType("author")
      .filterRaw(`!(_id in path("drafts.**"))`)
      .project({
        slug: true,
      });

    const authors = await runQuery(query);
    return authors
      .map((author) => ({
        slug: (author.slug as { current?: string | null } | null)?.current ?? "",
      }))
      .filter((param) => param.slug !== "");
  } catch (err) {
    console.error(
      "there was an error getting the author slugs statically:",
      err,
    );
    return [];
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) {
    return {};
  }

  const previousImages = (await parent).openGraph?.images || [];

  const images = author?.image
    ? [builder.image(author.image).url()]
    : [...previousImages];

  const authorName = author?.name ?? "";
  
  const description = author?.bio?.[0]?.children?.[0]?.text
    ? shortenDescription(author.bio[0].children[0].text ?? "", 160)
    : (await parent).description;

  return {
    title: authorName,
    ...(description && { description }),
    openGraph: {
      images,
      url: `https://www.projectgenzwrites.com/author/${slug}`,
      title: authorName,
      ...(description && { description }),
    },
    twitter: {
      images,
      title: authorName,
      ...(description && { description }),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) {
    notFound();
  }
  const authorName = author?.name ?? "";
  const shareText = `Visit ${authorName} on Project Gen Z Writes`;

  const components: any = {
    marks: {
      link: ({
        value,
        children,
      }: {
        value: { _type: string };
        children: ReactNode;
      }) => {
        const { blank, href }: any = value;
        return blank ? (
          <Link href={href} target="_blank">
            {children}
          </Link>
        ) : (
          <Link href={href}>{children}</Link>
        );
      },
    },
  };

  return (
    <>
      <div />
      <TopHeader
        src={author?.image ? builder.image(author.image).url() : undefined}
        name={authorName}
        description={shareText}
        slug={slug}
      />
      <div className="mb-10">
        <section className="sm:mt-36 mt-20 max-w-4xl mx-auto">
          <div className="px-4">
            <div className="space-y-4">
              {author.image && (
                <div className="xs:w-[120px] xs:h-[120px] w-[80px] h-[80px] relative">
                  <Image
                    src={builder.image(author.image).url()}
                    alt={authorName}
                    fill
                    sizes="(min-width: 475px) 120px, 80px"
                    className="object-cover absolute rounded-[50%]"
                  />
                </div>
              )}
              <div className="flex justify-between items-center gap-6 flex-wrap">
                <h1 className="sm:text-4xl xs:text-3xl text-2xl font-serif font-semibold text-ink">
                  {authorName}
                </h1>{" "}
                <div className="flex items-center gap-4">
                  {author?.socials?.website && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={author.socials.website} target="_blank">
                            <div className="flex flex-col items-center text-ink-muted hover:text-brandPrimary transition-colors">
                              <ExternalLinkIcon className="hover:bg-ink/5 p-1 xs:h-8 xs:w-8 h-6 w-6 flex items-center justify-center rounded-md" />
                              <span className="text-xs">Website</span>
                            </div>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>{`${author.name} Website`}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {author?.socials?.instagram && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={author.socials.instagram} target="_blank">
                            <div className="flex flex-col items-center text-ink-muted hover:text-brandPrimary transition-colors">
                              <ExternalLinkIcon className="hover:bg-ink/5 p-1 xs:h-8 xs:w-8 h-6 w-6 flex items-center justify-center rounded-md" />
                              <span className="text-xs">Instagram</span>
                            </div>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>{`${author.name} Instagram`}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <ShareButton
                          title={authorName}
                          slug={author.slug?.current ?? ""}
                          text={shareText}
                        />
                      </TooltipTrigger>
                      <TooltipContent>Share</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            <section className="mt-16">
              <h2 className="sm:text-[28px] xs:text-2xl text-xl mb-2 font-semibold text-ink">
                About
              </h2>
              <div className="space-y-4 leading-10 text-ink-muted font-serif paper-card p-6 rounded-lg">
                {author.bio && (
                  <PortableText value={author.bio} components={components} />
                )}
              </div>
            </section>
          </div>
          {author.books && (
            <section className="mt-16">
              <h2 className="sm:text-[28px] xs:text-2xl text-xl px-4 font-semibold text-ink">
                Books
              </h2>
              <BooksSwiper books={author.books} />
            </section>
          )}
          {author.videos && (
            <section className="mt-16">
              <h2 className="sm:text-[28px] xs:text-2xl text-xl px-4 font-semibold text-ink">
                Videos
              </h2>
              <VideosSwiper videos={author.videos} />
            </section>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}
