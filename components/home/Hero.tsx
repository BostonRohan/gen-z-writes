import { ChevronRight, PenLine, BookOpen } from "lucide-react";
import { bebasNeue } from "../../app/fonts";
import GradientButton from "../global/GradientButton";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center px-4 relative">
      {/* Decorative pencil icon */}
      <div className="absolute -top-8 right-8 sm:right-16 opacity-20">
        <PenLine className="w-24 h-24 sm:w-32 sm:h-32 text-brandPrimary rotate-45" />
      </div>

      <header className="relative">
        {/* Handwritten "welcome" above main title */}
        <p className="font-handwriting text-3xl sm:text-4xl text-ink-muted mb-2 -rotate-2">
          Welcome, young writers!
        </p>

        <h1
          className={`${bebasNeue.className} sm:text-9xl text-7xl leading-none text-ink`}
        >
          <div className="whitespace-nowrap xs:leading-[80px] leading-none">
            Project{" "}
            <span className="gradient-text-animation whitespace-nowrap">
              Gen Z
            </span>{" "}
          </div>
          Writes
        </h1>

        {/* Decorative underline */}
        <div className="w-48 sm:w-64 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-brandPrimary to-transparent opacity-60" />

        <p className="max-w-[600px] mx-auto font-serif text-ink-light sm:text-xl text-lg mt-6 leading-relaxed">
          A creative writing education platform bridging the gap and empowering
          the next generation of{" "}
          <span className="highlight">literary changemakers</span> through video
          content.
        </p>
      </header>

      <section className="w-full max-w-[500px] mx-auto flex flex-wrap text-center justify-center items-center font-semibold pt-8 gap-4">
        <GradientButton
          href="/database"
          gradient="bg-gradient-to-r from-brandPrimary to-brandSecondary"
          hoverGrow={false}
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            View Database
          </span>
        </GradientButton>
        <Link
          href="https://discord.gg/arENz9gzuj"
          className="flex gap-1 p-2 px-4 hover:bg-ink/5 text-ink justify-center items-center rounded-lg border border-ink/20 transition-colors"
          target="_blank"
        >
          Join Discord
          <ChevronRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Decorative notebook spiral hint */}
      <div className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col gap-6 opacity-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full border-2 border-ink-muted"
          />
        ))}
      </div>
    </section>
  );
}
