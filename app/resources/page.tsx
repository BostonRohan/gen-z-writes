import { teenMagazines } from "./data";
import Link from "next/link";
import Image from "next/image";
import Swiper from "@/components/swipers/Swiper";
import classNames from "classnames";
import Footer from "@/components/Footer";

export default function Page() {
  const magazineSwiperSlides = teenMagazines.map((magazine) => (
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
        className="xs:w-[180px] xs:h-[180px] w-[120px] h-[120px] object-cover"
      />
      <div className="space-y-1 pt-2 max-w-[180px]">
        <h3
          className={classNames({
            "line-clamp-1": magazine.description,
          })}
        >
          {magazine.title}
        </h3>
        {magazine.description && (
          <p className="line-clamp-2 text-muted-foreground">
            {magazine.description}
          </p>
        )}
      </div>
    </Link>
  ));

  const breakpoints = {
    280: {
      slidesPerView: 1.8,
    },
    350: {
      slidesPerView: 2.2,
    },
    560: {
      slidesPerView: 2.8,
    },
    700: {
      slidesPerView: 3.5,
    },
    896: {
      slidesPerView: 4.5,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-10 relative">
      <article className="pb-10 space-y-4 px-4">
        <h1 className="sm:text-5xl text-3xl font-semibold">Resources</h1>
        <p className="text-muted-foreground leading-7">
          Below we have compiled a list of resources, both educational and not,
          in order to create a roadmap for you to continue your creative
          journey, put yourself out there and apply the skills you have learned
          in the videos.
        </p>
      </article>
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="sm:text-2xl text-lg text-medium px-4">
            Literary magazines that accept teen writers
          </h2>
          <span className="text-sm text-muted-foreground underline">
            {teenMagazines.length}
          </span>
        </div>
        <Swiper
          swiperSlides={magazineSwiperSlides}
          breakpoints={breakpoints}
          className="!py-1"
        />
      </section>
    </div>
  );
}
