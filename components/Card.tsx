import { Video, Written } from "./CardGrid";
import { v4 as uuidv4 } from "uuid";
import { poppins } from "../app/fonts";
import Link from "next/link";
import getYoutubeId from "@/utils/getYoutubeId";
import YoutubePlayer from "./Youtube";
import YoutubeThumbnail from "./YoutubeThumbnail";
import Image from "next/image";

interface ContentCardProps {
  video?: Video;
  written?: Written;
  cardClassName?: string;
  showVideo?: boolean;
  contentWidth: number;
  contentHeight: number;
  thumbnailIconClassName?: string;
  thumbnailClassName?: string;
  author: Author;
  loadImages?: "eager" | "lazy";
}

export interface Author {
  id: string;
  createdAt: string;
  updatedAt: string;
  identifier: string;
  data: {
    name: string;
    bio: string;
    slug: string;
    image?: string;
    website?: string;
    books?: {
      name: string | null;
      link: string | null;
      image: string | null;
    }[];
    socials?: {
      title: string | null;
      link: string | null;
      source: string | null;
    }[];
  };
}

const Card = ({
  video,
  written,
  cardClassName,
  showVideo,
  contentWidth,
  contentHeight,
  thumbnailIconClassName,
  thumbnailClassName,
  author,
  loadImages,
}: ContentCardProps) => {
  return (
    <article
      key={video?.id ?? written?.id}
      className={`md:my-8 my-12 shrink-0 w-full capitalize h-full max-w-[450px] text-white ${cardClassName}`}
    >
      <h1 className="font-bold mb-4 truncate text-2xl">
        {video?.data.title ?? written?.data.title}
      </h1>
      {video && showVideo ? (
        <YoutubePlayer
          id={getYoutubeId(video.data.link)}
          title={video.data.title}
          width={contentWidth.toString()}
          height={contentHeight.toString()}
        />
      ) : (
        <div className={`!w-[${contentWidth}px]`}>
          <Link
            href={
              video && video.data.link
                ? `/database/videos/${video.data.slug}`
                : (written?.data.content &&
                    `/database/written/${written.data.slug}`) ||
                  {}
            }
          >
            {video && video.data.link ? (
              <YoutubeThumbnail
                id={getYoutubeId(video.data.link)}
                loading={loadImages}
                title={video.data.title}
                width={contentWidth}
                height={contentHeight}
                className={thumbnailClassName}
                iconClassName={thumbnailIconClassName}
              />
            ) : (
              <Image
                src={written?.data.author.data?.image ?? ""}
                alt={written?.data.author.data.name ?? ""}
                width={contentWidth}
                height={contentHeight}
                className="rounded-xl !mx-auto"
                style={{ width: contentWidth, height: contentHeight }}
              />
            )}
          </Link>
        </div>
      )}
      <section className="flex justify-between lg:flex-row flex-col text-left gap-2 mt-4 mx-auto lg:items-center">
        <address className="author flex gap-2 items-center my-auto">
          {author.data.image && (
            <Image
              src={author.data.image}
              height={30}
              width={30}
              className="rounded-full"
              style={{ width: "30px", height: "30px" }}
              alt={author.data.name}
              loading={loadImages}
            />
          )}
          <p className={`${poppins.className} truncate text-lg`}>
            {author.data.name}
          </p>
        </address>
        {video && (
          <div className="flex gap-2">
            {video.data.type.split(",").map((genre: string) => {
              const id = uuidv4();
              return (
                <span
                  className="p-2 bg-[#0749ac43] shrink-1 rounded-xl h-10 w-fit truncate text-base"
                  key={id}
                >
                  {genre}
                </span>
              );
            })}
          </div>
        )}
      </section>
    </article>
  );
};

export default Card;
