"use client";

import { ChangeEvent, useState } from "react";
import Card, { Author } from "./Card";
import SearchInput from "./SearchInput";
import { inter } from "../app/fonts";

export interface Video {
  id: string;
  createdAt: string;
  updatedAt: string;
  identifier: string;
  data: {
    title: string;
    link: string;
    type: string;
    author: Author;
    slug: string;
  };
}

export interface Written {
  id: string;
  createdAt: string;
  updatedAt: string;
  identifier: string;
  data: {
    title: string;
    content: string;
    author: Author;
    slug: string;
  };
}

const CardGrid = ({
  videos,
  written,
}: {
  videos: Video[];
  written: Written[];
}) => {
  const [content, setContent] = useState(
    [...videos, ...written].sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
    )
  );

  const searchCriteria = (searchTerm: string, input: string) => {
    searchTerm = searchTerm?.toLowerCase().replace(/[^0-9a-z]/gi, "");
    return searchTerm?.startsWith(input) || searchTerm?.includes(input);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredContent = videos.filter((video) => {
      const searchInput = e.target.value
        .toLowerCase()
        .replace(/^[ ]+|[ ]+$/g, "")
        .replace(/[^0-9a-z]/gi, "");

      //search by title, author or genre/type
      return (
        searchCriteria(video.data.title, searchInput) ||
        searchCriteria(video.data.author.data.name, searchInput) ||
        searchCriteria(video.data.type, searchInput)
      );
    });

    setContent(filteredContent);
  };

  console.log("content:", content.length);

  return (
    <>
      <SearchInput handleSearch={handleSearch} />
      {!content.length && (
        <h1
          className={`${inter.className} font-bold text-3xl text-white text-center`}
        >
          No Results Found
        </h1>
      )}
      <section className="text-white grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 p-4 place-items-center min-h-[50vh] sm:mb-32 mb-64">
        {!!content.length && (
          <>
            {content.map((content: Video | Written, i: number) => {
              if ("link" in content.data) {
                return (
                  content.data.link && (
                    <Card
                      loadImages={i < 2 ? "eager" : "lazy"}
                      author={content.data.author}
                      key={content.id}
                      video={content as Video}
                      contentWidth={450}
                      contentHeight={338}
                    />
                  )
                );
              } else {
                return (
                  content.data.content && (
                    <Card
                      loadImages={i < 2 ? "eager" : "lazy"}
                      author={content.data.author}
                      key={content.id}
                      written={content as Written}
                      contentWidth={250}
                      contentHeight={338}
                    />
                  )
                );
              }
            })}
          </>
        )}
      </section>
    </>
  );
};

export default CardGrid;
