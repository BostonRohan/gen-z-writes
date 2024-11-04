import { Video } from "@/app/database/videos/[slug]/page";
import { v4 as uuidv4 } from "uuid";
import { poppins } from "../app/fonts";
import Link from "next/link";
import getYoutubeId from "@/utils/getYoutubeId";
import YoutubePlayer from "./Youtube";
import YoutubeThumbnail from "./YoutubeThumbnail";
import imageUrlBuilder from "@sanity/image-url";
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
  const youtubeId = getYoutubeId(video.url);
  const builder = imageUrlBuilder(client);

  return (
    <article
      key={video._id}
      className={`md:my-8 my-12 shrink-0 w-full capitalize h-full max-w-[450px] text-white ${cardClassName}`}
    >
      <h1 className="font-bold mb-4 truncate text-2xl">{video.title}</h1>
      {showVideo ? (
        <YoutubePlayer
          id={youtubeId}
          title={video.title}
          width={videoWidth.toString()}
          height={videoHeight.toString()}
        />
      ) : (
        <Link href={`/database/videos/${video.slug}`}>
          {video.url && (
            <YoutubeThumbnail
              id={youtubeId}
              loading={loadImages}
              title={video.title}
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
          <Link href={`/author/${video.author.slug}`} className="flex gap-2">
            {video.author?.image && (
              <div className="w-[30px] h-[30px] relative">
                <Image
                  src={builder.image(video.author.image).url()}
                  className="rounded-full object-cover"
                  fill
                  alt={video.author.name}
                />
              </div>
            )}
            <p
              className={`${poppins.className} truncate text-muted-foreground hover:underline text-lg`}
            >
              {video.author.name}
            </p>
          </Link>
        </address>
        <div className="flex gap-2 sm:flex-nowrap flex-wrap last:truncate">
          {video.tags.map((tag: string, i: number) => {
            const id = uuidv4();
            return (
              <span
                className={classNames(
                  "p-1.5 bg-brandSecondary shrink-1 rounded-xl w-fit text-sm",
                  { truncate: i === video.tags.length - 1 },
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
