import { bebasNeue } from "@/app/fonts";

import Email from "./Email";
import MacWindow from "./MacWindow";

export default function Philosophy() {
  return (
    <section className="pt-[calc(50vh_-_4px)] text-slate-200 text-center px-4 flex flex-col gap-24">
      <div className="flex flex-wrap justify-center gap-16">
        <article>
          <h2
            className={`${bebasNeue.className} sm:text-[76px] sm:leading-none text-[16vw] leading-[16vw]`}
          >
            Our Philosophy
          </h2>
          <p className="max-w-[650px] mx-auto opacity-80 sm:leading-9 sm:text-lg leading-8">
            ProjectGenZWrites believes in the importance of storytelling in our
            culture, and that in order for stories to continue in the modern
            world, everyone needs to have access to high-quality writing advice
            for no fee. ProjectGenZWrites is meant for anyone with a passion for
            writing, no matter your skill level, race, gender, economic class,
            or sexuality. This is a place for you to grow with the authors in
            the videos and chart the creative path of your dreams.
          </p>
        </article>
        <MacWindow />
      </div>
      <section
        id="newsletter"
        className="flex flex-col items-center pt-24 overflow-x-hidden"
      >
        <h3 className="xs:text-3xl text-[6.5vw] leading-[7.5vw] font-bold">
          Interested in learning more?
        </h3>
        <h4 className="font-semibold sm:text-lg text-base">
          Join the newsletter
        </h4>
        <Email />
      </section>
    </section>
  );
}
