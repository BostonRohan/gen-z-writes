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
    <div className="w-full">
      <section className="w-full flex justify-center relative my-12">
        <div className="relative">
          <i className="absolute top-[20px] left-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4 h-4"
              fill="white"
            >
              <path d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z" />
            </svg>
          </i>
        </div>
        <input
          type="search"
          className={`rounded-xl bg-primary border-white border-2 p-4 w-full max-w-[450px] text-white outline-none ${poppins.className} placeholder:font-normal pl-10`}
          placeholder="Search by category, artist or title..."
        />
      </section>
      <main className="text-white grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 p-4 place-items-center">
        {rows.map(
          (video: Video) =>
            video.data?.link && (
              <article
                key={video.id}
                className="md:my-8 my-12 shrink-0 w-full capitalize max-w-[450px]"
              >
                <h1 className="font-bold mb-4 truncate text-xl">
                  {video.data.title}
                </h1>
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
                  <p className={`${poppins.className} truncate`}>
                    {video.data.author}
                  </p>
                  <div className="flex gap-2">
                    {video.data.type.split(",").map((genre: string) => {
                      const id = uuidv4();
                      return (
                        <span
                          className="p-2 bg-[#0749ac43] shrink-1 rounded-xl h-10 w-fit truncate"
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
    </div>
  );
}
