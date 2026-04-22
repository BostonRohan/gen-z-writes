import {
  teenMagazines,
  writingContests,
  writingCommunities,
  writingPromptWebsites,
} from "./data";
import Link from "next/link";
import Image from "next/image";
import Swiper from "@/components/swipers/Swiper";
import classNames from "classnames";
import Footer from "@/components/Footer";
import { bebasNeue } from "@/app/fonts";
import { BookOpen, Trophy, Users, Lightbulb } from "lucide-react";

interface SwiperSlideProps {
  title: string | null;
  link: string;
  image: string | null;
  description: string | null;
}

export default function Page() {
  const SwiperSlide = ({
    title,
    link,
    image,
    description,
  }: SwiperSlideProps) => (
    <Link
      href={link}
      target="_blank"
      className="hover:scale-105 transition block paper-card rounded-lg overflow-hidden"
    >
      <Image
        src={image ?? "https://www.projectgenzwrites.com/gen-z-writes-og.png"}
        alt={`${title ?? link} OG`}
        width={180}
        height={180}
        className="xs:w-[180px] xs:h-[180px] w-[120px] h-[120px] object-cover"
      />
      <div className="space-y-1 pt-2 max-w-[180px] px-2 pb-2">
        {title && (
          <h3
            className={classNames(
              "line-clamp-2 sm:text-base text-sm font-semibold text-ink",
              {
                "line-clamp-1": description,
              }
            )}
          >
            {title}
          </h3>
        )}
        {description && (
          <p className="line-clamp-2 text-ink-muted sm:text-base text-xs">
            {description}
          </p>
        )}
      </div>
    </Link>
  );

  const magazineSwiperSlides = teenMagazines.map((magazine) => (
    <SwiperSlide key={magazine.link} {...magazine} />
  ));

  const writingContestsSwiperSlides = writingContests.map((contest) => (
    <SwiperSlide key={contest.link} {...contest} />
  ));

  const writingCommunitiesSwiperSlides = writingCommunities.map((community) => (
    <SwiperSlide key={community.link} {...community} />
  ));

  const writingPromptWebsitesSwiperSlides = writingPromptWebsites.map(
    (website) => <SwiperSlide key={website.link} {...website} />
  );

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
    <div className="max-w-4xl mx-auto px-4 pt-10 relative space-y-8">
      <article className="space-y-4 px-4">
        <h1
          className={`${bebasNeue.className} sm:text-6xl text-4xl text-ink`}
        >
          Resources
        </h1>
        <p className="text-ink-light leading-7 font-serif">
          Below we have compiled a list of resources, both educational and not,
          in order to create a roadmap for you to continue your creative
          journey, put yourself out there and apply the skills you have learned
          in the videos.
        </p>
      </article>

      <section className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brandPrimary" />
            <h2 className="sm:text-2xl text-lg font-semibold text-ink">
              Literary magazines that accept teen writers
            </h2>
          </div>
          <span className="text-sm text-ink-muted bg-paper-dark px-2 py-1 rounded-full">
            {teenMagazines.length}
          </span>
        </div>
        <Swiper
          id="teen-magazines"
          swiperSlides={magazineSwiperSlides}
          breakpoints={breakpoints}
          className="!py-1 swiper-teen-magazines"
        />
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-brandPrimary" />
            <h2 className="sm:text-2xl text-lg font-semibold text-ink">
              Writing contests
            </h2>
          </div>
          <span className="text-sm text-ink-muted bg-paper-dark px-2 py-1 rounded-full">
            {writingContests.length}
          </span>
        </div>
        <Swiper
          id="writing-contests"
          swiperSlides={writingContestsSwiperSlides}
          breakpoints={breakpoints}
          className="!py-1 swiper-writing-contests"
        />
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brandPrimary" />
            <h2 className="sm:text-2xl text-lg font-semibold text-ink">
              Writing communities
            </h2>
          </div>
          <span className="text-sm text-ink-muted bg-paper-dark px-2 py-1 rounded-full">
            {writingCommunities.length}
          </span>
        </div>
        <Swiper
          id="writing-communities"
          swiperSlides={writingCommunitiesSwiperSlides}
          breakpoints={breakpoints}
          className="!py-1 swiper-writing-communities"
        />
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-brandPrimary" />
            <h2 className="sm:text-2xl text-lg font-semibold text-ink">
              Writing prompt websites
            </h2>
          </div>
          <span className="text-sm text-ink-muted bg-paper-dark px-2 py-1 rounded-full">
            {writingPromptWebsites.length}
          </span>
        </div>
        <Swiper
          id="writing-prompt-website"
          swiperSlides={writingPromptWebsitesSwiperSlides}
          breakpoints={breakpoints}
          className="!py-1 swiper-writing-prompt-websites"
        />
      </section>
      <div className="pt-10">
        <Footer />
      </div>
    </div>
  );
}
