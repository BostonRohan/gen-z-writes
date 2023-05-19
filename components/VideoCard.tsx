import { Video } from "./VideoGrid";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { poppins } from "../app/fonts";

const VideoCard = ({ video }: { video: Video }) => {
  const youtubeIdRegex =
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/m;
  return (
    <article
      key={video.id}
      className="md:my-8 my-12 shrink-0 w-full capitalize max-w-[450px]"
    >
      <h1 className="font-bold mb-4 truncate text-2xl">{video.data.title}</h1>
      <Image
        src={`https://img.youtube.com/vi/${
          youtubeIdRegex.exec(video.data.link)![3]
        }/sddefault.jpg`}
        alt={`${video.data.title} Youtube Thumbnail`}
        className="mx-auto"
        width={450}
        height={240}
      />
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
