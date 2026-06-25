"use client";

import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import type { ReactNode } from "react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useMemo, useState } from "react";

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
  id?: string;
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
  spaceBetween = 24,
  breakpoints = defaultBreakpoints,
  swiperSlides,
  slidesOffsetAfter = 16,
  slidesOffsetBefore = 16,
  showArrows = true,
  id = "swiper",
}: SwiperProps) {
  //generate unique id for key lengths
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null,
  );

  const slides = useMemo(
    () => swiperSlides.map((slide) => ({ id: uuidv4(), slide })),
    [swiperSlides],
  );

  return (
    <div className="relative">
      <SwiperReact
        id={id}
        modules={[Navigation]}
        slidesPerView="auto"
        className={`overflow-visible pr-20 ${className ?? ""}`}
        spaceBetween={spaceBetween}
        slidesOffsetAfter={slidesOffsetAfter}
        slidesOffsetBefore={slidesOffsetBefore}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={breakpoints}
        onSwiper={setSwiperInstance}
        navigation={{
          nextEl: `.arrow-right-${id}`,
          prevEl: `.arrow-left-${id}`,
        }}
      >
        {slides.map(({ slide, id }) => (
          <SwiperSlide
            key={id}
            className="!h-auto flex items-stretch !w-[260px] sm:!w-[280px]"
          >
            <div className="pr-6 h-full w-full">{slide}</div>
          </SwiperSlide>
        ))}
      </SwiperReact>
      {showArrows && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            className={`arrow-left-${id} absolute left-2 top-1/2 z-50 -translate-y-1/2 rounded-full bg-brandPrimary p-3 text-paper-cream shadow-lg ring-2 ring-paper transition hover:scale-105 hover:bg-brandSecondary ${
              swiperInstance?.isBeginning
                ? "pointer-events-none opacity-0"
                : "opacity-100"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className={`arrow-right-${id} absolute right-2 top-1/2 z-50 -translate-y-1/2 rounded-full bg-brandPrimary p-3 text-paper-cream shadow-lg ring-2 ring-paper transition hover:scale-105 hover:bg-brandSecondary ${
              swiperInstance?.isEnd ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
