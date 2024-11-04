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
      className="hover:scale-105 transition block"
    >
      <Image
        src={image ?? "https://www.projectgenzwrites.com/gen-z-writes-og.png"}
        alt={`${title ?? link} OG`}
        width={180}
        height={180}
        className="xs:w-[180px] xs:h-[180px] w-[120px] h-[120px] object-cover"
      />
      <div className="space-y-1 pt-2 max-w-[180px] px-1">
        {title && (
          <h3
            className={classNames("line-clamp-2 sm:text-base text-sm", {
              "line-clamp-1": description,
            })}
          >
            {title}
          </h3>
        )}
        {description && (
          <p className="line-clamp-2 text-muted-foreground sm:text-base text-xs">
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
    (website) => <SwiperSlide key={website.link} {...website} />,
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
          id="teen-magazines"
          swiperSlides={magazineSwiperSlides}
          breakpoints={breakpoints}
          className="!py-1 swiper-teen-magazines"
        />
      </section>
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="sm:text-2xl text-lg text-medium px-4">
            Writing contests
          </h2>
          <span className="text-sm text-muted-foreground underline">
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
        <div className="flex justify-between items-center">
          <h2 className="sm:text-2xl text-lg text-medium px-4">
            Writing communities
          </h2>
          <span className="text-sm text-muted-foreground underline">
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
        <div className="flex justify-between items-center">
          <h2 className="sm:text-2xl text-lg text-medium px-4">
            Writing prompt websites
          </h2>
          <span className="text-sm text-muted-foreground underline">
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
