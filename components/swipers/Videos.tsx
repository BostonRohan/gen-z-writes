"use client";

import { AuthorFragment } from "@/utils/fragments/author";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import YoutubeThumbnail from "../YoutubeThumbnail";
import getYoutubeId from "@/utils/getYoutubeId";

export default function VideosSwiper({ videos }: { videos: AuthorFragment["videos"] }) {
  if (!videos) return null;
  
  return (
    <Swiper
      slidesPerView="auto"
      className="!py-4"
      spaceBetween={24}
      slidesOffsetAfter={16}
      slidesOffsetBefore={16}
      pagination={{ clickable: true }}
      breakpoints={{
        280: {
          slidesPerView: 1.8,
        },
        375: {
          slidesPerView: 2.5,
        },
        600: {
          slidesPerView: "auto",
        },
      }}>
      {videos.map((video) => {
        const youtubeId = getYoutubeId(video?.url ?? "");
        const slug = video?.slug?.current ?? "";
        const title = video?.title ?? "";
        return (
          <SwiperSlide key={youtubeId} className="max-w-[250px]">
            <Link
              href={`/database/videos/${slug}`}
              className="hover:scale-105 transition block">
              <YoutubeThumbnail
                id={youtubeId}
                title={title}
                width={250}
                height={250}
              />
              <h3 className="line-clamp-1 mt-1">{title}</h3>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
