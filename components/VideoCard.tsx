import { Video } from "@/app/database/videos/[slug]/page";
import { v4 as uuidv4 } from "uuid";
import { poppins } from "../app/fonts";
import Link from "next/link";
import getYoutubeId from "@/utils/getYoutubeId";
import YoutubePlayer from "./Youtube";
import YoutubeThumbnail from "./YoutubeThumbnail";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Image from "next/image";
import classNames from "classnames";

export type LoadImages = "eager" | "lazy";

interface VideoCardProps {
  cardClassName?: string;
  showVideo?: boolean;
  videoWidth: number;
  videoHeight: number;
  thumbnailIconClassName?: string;
  thumbnailClassName?: string;
  loadImages?: LoadImages;
  video: Video;
}

const VideoCard = ({
  video,
  cardClassName,
  showVideo,
  videoWidth,
  videoHeight,
  thumbnailIconClassName,
  thumbnailClassName,
  loadImages,
}: VideoCardProps) => {
  if (!video) return null;
  
  const url = video.url ?? "";
  const title = video.title ?? "";
  const slug = video.slug?.current ?? "";
  const tags = video.tags ?? [];
  const author = video.author;
  
  const youtubeId = getYoutubeId(url);
  const builder = createImageUrlBuilder(client);

  return (
    <article
      key={video._id}
      className={`md:my-8 my-12 shrink-0 w-full capitalize h-full max-w-[450px] text-white ${cardClassName}`}
    >
      <h1 className="font-bold mb-4 truncate text-2xl">{title}</h1>
      {showVideo ? (
        <YoutubePlayer
          id={youtubeId}
          title={title}
          width={videoWidth}
          height={videoHeight}
        />
      ) : (
        <Link href={`/database/videos/${slug}`}>
          {url && (
            <YoutubeThumbnail
              id={youtubeId}
              loading={loadImages}
              title={title}
              width={videoWidth}
              height={videoHeight}
              className={thumbnailClassName}
              iconClassName={thumbnailIconClassName}
            />
          )}
        </Link>
      )}
      <section className="flex justify-between flex-wrap lg:flex-row flex-col text-left gap-2 mt-4 mx-auto lg:items-center">
        <address className="author flex gap-2 items-center my-auto">
          {author && (
            <Link href={`/author/${author.slug?.current ?? ""}`} className="flex gap-2">
              {author.image && (
                <div className="w-[30px] h-[30px] relative">
                  <Image
                    src={builder.image(author.image).url()}
                    className="rounded-full object-cover"
                    fill
                    sizes="30px"
                    alt={author.name ?? ""}
                  />
                </div>
              )}
              <p
                className={`${poppins.className} truncate text-muted-foreground hover:underline text-lg`}
              >
                {author.name}
              </p>
            </Link>
          )}
        </address>
        <div className="flex gap-2 sm:flex-nowrap flex-wrap last:truncate">
          {tags.map((tag: string, i: number) => {
            const id = uuidv4();
            return (
              <span
                className={classNames(
                  "p-1.5 bg-brandSecondary shrink-1 rounded-xl w-fit text-sm",
                  { truncate: i === tags.length - 1 },
                )}
                key={id}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </section>
    </article>
  );
};

export default VideoCard;
