async function getVideos() {
  const res = await fetch(
    `https://studio.plasmic.app/api/v1/cms/databases/${process.env.NEXT_PUBLIC_CMS_ID}/tables/videos/query`,
    {
      headers: {
        "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

import { Metadata } from "next";
import { poppins } from "../fonts";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export const metadata: Metadata = {
  title: "Database",
  description:
    "Explore our collection of videos, our database features a curated selection of videos that cover a wide range of topics, including writing tips, author interviews, and more. Watch and learn from experienced writers in the industry and discover new insights into the craft of writing.",
  creator: "Gen Z Writes",
  category: "Database",
  openGraph: {
    title: "Database",
    description:
      "Explore our collection of videos, our database features a curated selection of videos that cover a wide range of topics, including writing tips, author interviews, and more. Watch and learn from experienced writers in the industry and discover new insights into the craft of writing.",
  },
};

interface Video {
  id: string;
  createdAt: string;
  updatedAt: string;
  identifier: string;
  data: {
    title: string;
    link: string;
    type: string;
    author: string;
  };
}

export default async function Page() {
  const { rows } = await getVideos();

  const youtubeIdRegex =
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/m;

  return (
    <main className="text-white grid md:grid-cols-2 grid-cols-1 md:gap-4 p-4 place-items-center">
      {rows.map(
        (video: Video) =>
          video.data?.link && (
            <article key={video.id} className="md:my-8 my-12 shrink-0">
              <h1 className="font-bold mb-4">{video.data.title}</h1>
              <Image
                src={`https://img.youtube.com/vi/${
                  youtubeIdRegex.exec(video.data.link)![3]
                }/sddefault.jpg`}
                alt={`${video.data.title} Youtube Thumbnail`}
                width={450}
                height={240}
              />
              <section className="flex justify-between gap-2 mt-4 max-w-[450px] items-center">
                <p className={`${poppins.className} truncate`}>
                  {video.data.author}
                </p>
                <div className="flex gap-2">
                  {video.data.type.split(",").map((genre: string) => {
                    const id = uuidv4();
                    return (
                      <span
                        className="p-2 bg-[#0749ac43] shrink-1 rounded-xl h-10"
                        key={id}
                      >
                        {genre}
                      </span>
                    );
                  })}
                </div>
              </section>
            </article>
          )
      )}
    </main>
  );
}
