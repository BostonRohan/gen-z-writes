"use client";

import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { ReactNode } from "react";

interface SlidesPerView {
  slidesPerView: number | "auto";
}

interface Breakpoints {
  [width: number]: SlidesPerView;
  [ratio: string]: SlidesPerView;
}

interface SwiperProps {
  className?: string;
  spaceBetween?: number;
  breakpoints?: Breakpoints;
  swiperSlides: ReactNode[];
}

const defaultBreakpoints: Breakpoints = {
  280: {
    slidesPerView: 1.8,
  },
  375: {
    slidesPerView: 2.5,
  },
  450: {
    slidesPerView: "auto",
  },
};

export default function Swiper({
  className,
  spaceBetween,
  breakpoints = defaultBreakpoints,
  swiperSlides,
}: SwiperProps) {
  return (
    <SwiperReact
      slidesPerView="auto"
      className={className}
      spaceBetween={spaceBetween}
      slidesOffsetAfter={16}
      slidesOffsetBefore={16}
      pagination={{ clickable: true }}
      breakpoints={breakpoints}
    >
      {swiperSlides.map((swiperSlide) => (
        //TODO: uuid for key
        <SwiperSlide key={"test"}>{swiperSlide}</SwiperSlide>
      ))}
    </SwiperReact>
  );
}
