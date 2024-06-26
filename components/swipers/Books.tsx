"use client";

import { Author } from "@/app/author/[slug]/page";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import Link from "next/link";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export default function BooksSwiper({ books }: { books: Author["books"] }) {
  const builder = imageUrlBuilder(client);
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
        450: {
          slidesPerView: "auto",
        },
      }}
    >
      {books!.map((book) => (
        <SwiperSlide key={book._key} className="max-w-[180px]">
          <Link
            href={book.url}
            target="_blank"
            className="hover:scale-105 transition block"
          >
            <Image
              src={builder.image(book.cover).url()}
              alt={`${book.title} Cover`}
              width={180}
              height={180}
              className="rounded-md aspect-[5/8]"
            />
            <h3 className="mt-1">{book.title}</h3>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
