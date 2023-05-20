import { Video } from "./VideoGrid";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { poppins } from "../app/fonts";
import Link from "next/link";
import getYoutubeId from "@/utils/getYoutubeId";

interface VideoCardProps {
  video: Video;
  link?: boolean;
  cardClassName?: string;
  showVideo?: boolean;
}

const VideoCard = ({
  video,
  link,
  cardClassName,
  showVideo,
}: VideoCardProps) => {
  const youtubeId = getYoutubeId(video.data.link);

  return (
    <article
      key={video.id}
      className={`md:my-8 my-12 shrink-0 w-full capitalize max-w-[450px] ${cardClassName}`}
    >
      <h1 className="font-bold mb-4 truncate text-2xl">{video.data.title}</h1>
      <Link
        href={
          video.data.link
            ? `/database/videos/${video.data.title
                .trim()
                .replace(/[^\w\s]/gi, "")
                .toLowerCase()
                .replace(/\s/gi, "-")}`
            : {}
        }
      >
        <div className="relative w-auto h-auto">
          {video.data.link && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill="white"
              className="w-8 h-8 absolute top-1/2 left-[45%]"
            >
              <path d="M48 432L336 256 48 80l0 352zM24.5 38.1C39.7 29.6 58.2 30 73 39L361 215c14.3 8.7 23 24.2 23 41s-8.7 32.2-23 41L73 473c-14.8 9.1-33.4 9.4-48.5 .9S0 449.4 0 432V80C0 62.6 9.4 46.6 24.5 38.1z" />
            </svg>
          )}
          <Image
            src={`https://img.youtube.com/vi/${youtubeId}/sddefault.jpg`}
            alt={`${video.data.title} Youtube Thumbnail`}
            className="mx-auto w-[450px] h-[240px] rounded-xl"
            width={450}
            height={240}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </Link>
      <section className="flex justify-between sm:flex-row flex-col text-left gap-2 mt-4 mx-auto sm:items-center">
        <p className={`${poppins.className} truncate text-lg`}>
          {video.data.author}
        </p>
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
