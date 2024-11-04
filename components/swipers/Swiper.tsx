"use client";

import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import type { ReactNode } from "react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";

import "swiper/css";
import "swiper/css/navigation";

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
  slidesOffsetAfter?: number;
  slidesOffsetBefore?: number;
  showArrows?: boolean;
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
  slidesOffsetAfter = 16,
  slidesOffsetBefore = 16,
  showArrows = true,
}: SwiperProps) {
  //generate unique id for key lengths

  const slides = useMemo(
    () => swiperSlides.map((slide) => ({ id: uuidv4(), slide })),
    [swiperSlides],
  );

  return (
    <div className="relative">
      <SwiperReact
        modules={[Navigation]}
        slidesPerView="auto"
        className={className}
        spaceBetween={spaceBetween}
        slidesOffsetAfter={slidesOffsetAfter}
        slidesOffsetBefore={slidesOffsetBefore}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={breakpoints}
        navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
      >
        {slides.map(({ slide, id }) => (
          <SwiperSlide key={id}>{slide}</SwiperSlide>
        ))}
      </SwiperReact>
      {showArrows && (
        <>
          <button className="arrow-left arrow top-[35%] rounded-full -ml-2 bg-muted-foreground/60 hover:bg-popover-foreground/70 p-1 absolute left-0 z-50 transition opacity-1 xs:block hidden">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="arrow-right arrow arrow top-[35%] rounded-full -mr-4 bg-muted-foreground/60 hover:bg-popover-foreground/70 p-1 absolute right-0 z-50 transition opacity-1 xs:block hidden">
            <ArrowRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
