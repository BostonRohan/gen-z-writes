import { ChevronRight } from "lucide-react";
import { bebasNeue } from "../../app/fonts";
import GradientButton from "../global/GradientButton";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center px-4">
      <header>
        <h1
          className={`${bebasNeue.className} sm:text-9xl text-[20vw] xs:leading-none leading-[0.9]`}
        >
          <div className="whitespace-nowrap xs:leading-[80px] leading-none">
            Project{" "}
            <span className="gradient-text-animation whitespace-nowrap">
              Gen Z
            </span>{" "}
          </div>
          Writes
        </h1>
        <p className="max-w-[600px] mx-auto font-semibold text-muted-foreground xs:text-2xl">
          A creative writing education platform bridging the gap and empowering
          the next generation of literary <span className="type-nextGen" />
          through video content.
        </p>
      </header>
      <section className="w-full max-w-[450px] mx-auto flex flex-wrap text-center justify-center items-center font-semibold pt-4 gap-2">
        <GradientButton
          href="/database"
          gradient="bg-gradient-to-r from-brandPrimary to-brandSecondary"
          hoverGrow={false}
        >
          View database
        </GradientButton>
        <Link
          href="https://discord.gg/arENz9gzuj"
          className="flex gap-1 p-2 hover:bg-muted-foreground/10 justify-center items-center rounded-lg"
          target-="_blank"
        >
          Join Discord
          <ChevronRight className="w-5 h-5" />
        </Link>
      </section>
    </section>
  );
}
