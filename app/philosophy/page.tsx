import { bebasNeue } from "@/app/fonts";

export default function Philosophy() {
  return (
    <main className="py-10 px-4 mx-auto max-w-3xl">
      <h1
        className={`${bebasNeue.className} sm:text-[76px] gradient-text-animation sm:leading-none text-[16vw] leading-[16vw]`}
      >
        Our Philosophy
      </h1>
      <p className="leading-10 text-white">
        ProjectGenZWrites{" "}
        <span className="opacity-80">
          is a fast-growing, youth-led, non-profit database that educates the
          next generation of novelists, poets, journalists, and creative
          visionaries. We believe in the power of communal nurturing and
          building a world that is kinder, stronger, and healthier due to the
          plethora of creative people in it. Yet, we recognized a gap that stood
          in the way of getting to that place. Money and its connection to
          accessibility of vital education. This is why we partner with
          published authors, who generously give us their time to create videos
          sharing their incredible knowledge with our viewers. Videos are about
          anything within the writing process, from publishing to creative
          exhaustion. They are available on the website free of charge, aligning
          with our goal to bridge the creative education gap and give everyone a
          chance to pursue their creative passions.
        </span>
      </p>
    </main>
  );
}
