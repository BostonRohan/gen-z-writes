import { bebasNeue } from "@/app/fonts";
import { Feather, Quote } from "lucide-react";
import Link from "next/link";

export default function Philosophy() {
  return (
    <section className="px-4 flex flex-col gap-24">
      <div className="flex flex-wrap justify-center gap-16">
        <article className="relative max-w-[750px]">
          {/* Decorative quote marks */}
          <Quote className="absolute -top-6 -left-4 w-12 h-12 text-brandPrimary/20 rotate-180" />

          <h2
            className={`${bebasNeue.className} sm:text-[76px] sm:leading-none text-[16vw] leading-[16vw] text-ink`}
          >
            Our Philosophy
          </h2>

          {/* Decorative feather */}
          <div className="absolute -right-8 top-0 hidden sm:block">
            <Feather className="w-16 h-16 text-brandPrimary/30 rotate-45" />
          </div>

          <div className="paper-card p-6 sm:p-8 rounded-lg mt-4">
            <p className="font-serif sm:leading-9 sm:text-lg leading-8 text-ink-light">
              <span className="font-handwriting text-2xl text-brandPrimary">
                P
              </span>
              rojectGenZWrites is a fast-growing, youth-led, non-profit database
              that educates the next generation of{" "}
              <span className="highlight">novelists</span>,{" "}
              <span className="highlight">poets</span>,{" "}
              <span className="highlight">journalists</span>, and{" "}
              <span className="highlight">creative visionaries</span>.
            </p>

            <Link
              href="/philosophy"
              className="inline-flex items-center gap-2 mt-6 text-brandPrimary hover:text-brandSecondary font-semibold transition-colors pencil-underline"
            >
              Read our full story
              <span className="text-lg">→</span>
            </Link>
          </div>

          <Quote className="absolute -bottom-6 -right-4 w-12 h-12 text-brandPrimary/20" />
        </article>
      </div>
    </section>
  );
}
