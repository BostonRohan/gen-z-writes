import { Video } from "@/app/database/videos/[slug]/page";
import { v4 as uuidv4 } from "uuid";
import { poppins } from "../app/fonts";
import Link from "next/link";
import getYoutubeId from "@/utils/getYoutubeId";
import YoutubePlayer from "./Youtube";
import YoutubeThumbnail from "./YoutubeThumbnail";

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

  return (
    <article
      key={video._id}
      className={`md:my-8 my-12 shrink-0 w-full capitalize h-full max-w-[450px] text-white ${cardClassName}`}>
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
      <section className="flex justify-between flex-wra lg:flex-row flex-col text-left gap-2 mt-4 mx-auto lg:items-center">
        <address className="author flex gap-2 items-center my-auto">
          {/* <AuthorImage
            src={author.data.image ?? ""}
            alt={author.data.name}
            loading={"lazy"}
          /> */}
          <Link
            href={`/author/${video.author.slug}`}
            className={`${poppins.className} truncate opacity-90 hover:underline text-lg`}>
            {video.author.name}
          </Link>
        </address>
        <div className="flex gap-2 flex-wrap">
          {video.tags.map((tag: string) => {
            const id = uuidv4();
            return (
              <span
                className="p-2 bg-[#0749ac43] shrink-1 rounded-xl h-10 w-fit truncate text-base"
                key={id}>
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
