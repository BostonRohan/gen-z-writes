import { Video } from "./VideoGrid";
import { v4 as uuidv4 } from "uuid";
import { poppins } from "../app/fonts";
import Link from "next/link";
import getYoutubeId from "@/utils/getYoutubeId";
import YoutubePlayer from "./Youtube";
import YoutubeThumbnail from "./YoutubeThumbnail";
import AuthorImage from "./AuthorImage";

export type LoadImages = "eager" | "lazy";

interface VideoCardProps {
  video: Video;
  cardClassName?: string;
  showVideo?: boolean;
  videoWidth: number;
  videoHeight: number;
  thumbnailIconClassName?: string;
  thumbnailClassName?: string;
  author: Author;
  loadImages?: LoadImages;
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

const VideoCard = ({
  video,
  cardClassName,
  showVideo,
  videoWidth,
  videoHeight,
  thumbnailIconClassName,
  thumbnailClassName,
  author,
  loadImages,
}: VideoCardProps) => {
  const youtubeId = getYoutubeId(video.data.link);

  return (
    <article
      key={video.id}
      className={`md:my-8 my-12 shrink-0 w-full capitalize h-full max-w-[450px] text-white ${cardClassName}`}
    >
      <h1 className="font-bold mb-4 truncate text-2xl">{video.data.title}</h1>
      {showVideo ? (
        <YoutubePlayer
          id={youtubeId}
          title={video.data.title}
          width={videoWidth.toString()}
          height={videoHeight.toString()}
        />
      ) : (
        <Link href={`/database/videos/${video.data.slug}`}>
          {video.data.link && (
            <YoutubeThumbnail
              id={youtubeId}
              loading={loadImages}
              title={video.data.title}
              width={videoWidth}
              height={videoHeight}
              className={thumbnailClassName}
              iconClassName={thumbnailIconClassName}
            />
          )}
        </Link>
      )}
      <section className="flex justify-between lg:flex-row flex-col text-left gap-2 mt-4 mx-auto lg:items-center">
        <address className="author flex gap-2 items-center my-auto">
          <AuthorImage
            src={author.data.image ?? ""}
            alt={author.data.name}
            loading={"lazy"}
          />
          <p className={`${poppins.className} truncate text-lg`}>
            {author.data.name}
          </p>
        </address>
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
      </section>
    </article>
  );
};

export default VideoCard;
