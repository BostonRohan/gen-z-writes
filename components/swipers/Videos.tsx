"use client";

import { Author } from "@/app/author/[slug]/page";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import YoutubeThumbnail from "../YoutubeThumbnail";
import getYoutubeId from "@/utils/getYoutubeId";

export default function VideosSwiper({ videos }: { videos: Author["videos"] }) {
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
      {videos!.map((video) => {
        const youtubeId = getYoutubeId(video.url);
        return (
          <SwiperSlide key={youtubeId} className="max-w-[250px]">
            <Link
              href={`/database/videos/${video.slug}`}
              className="hover:scale-105 transition block">
              <YoutubeThumbnail
                id={youtubeId}
                title={video.title}
                width={250}
                height={250}
              />
            </Link>
            <h3 className="line-clamp-1 mt-1">{video.title}</h3>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
