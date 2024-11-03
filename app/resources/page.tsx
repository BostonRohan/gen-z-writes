import { teenMagazines } from "./data";
import Link from "next/link";
import Image from "next/image";
import Swiper from "@/components/swipers/Swiper";

export default function Page() {
  const swiperSlides = teenMagazines.map((magazine) => (
    <Link
      key={magazine.title}
      href={magazine.link}
      target="_blank"
      className="hover:scale-105 transition block"
    >
      <Image
        src={
          magazine.image ??
          "https://www.projectgenzwrites.com/gen-z-writes-og.png"
        }
        alt={`${magazine.title} OG`}
        width={180}
        height={180}
      />
      <div className="space-y-1 pt-2">
        <h3 className=" line-clamp-1">{magazine.title}</h3>
        {magazine.description && (
          <p className="line-clamp-2">{magazine.description}</p>
        )}
      </div>
    </Link>
  ));

  const breakpoints = {
    280: {
      slidesPerView: 1.8,
    },
    514: {
      slidesPerView: 2.5,
    },
    700: {
      slidesPerView: 3.5,
    },
    896: {
      slidesPerView: 4.5,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <article className="pb-10">
        <h1>Resources</h1>
        <p>
          Below we have compiled a list of resources, both educational and not,
          in order to create a roadmap for you to continue your creative
          journey, put yourself out there and apply the skills you have learned
          in the videos.
        </p>
      </article>
      <section className="space-y-4">
        <h2>Literary Magazines that accept Teen Writers</h2>
        <Swiper
          swiperSlides={swiperSlides}
          breakpoints={breakpoints}
          className="!py-1"
        />
      </section>
    </div>
  );
}
