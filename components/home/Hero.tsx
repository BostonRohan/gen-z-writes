import { bebasNeue } from "../../app/fonts";
import GradientButton from "../global/GradientButton";

export default function Hero() {
  return (
    <section className="text-center text-slate-200 px-4">
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
        <p className="max-w-[600px] mx-auto font-semibold opacity-60 xs:text-2xl">
          A creative writing education platform bridging the gap and empowering
          the next generation of literary <span className="type-nextGen" />
          through video content.
        </p>
      </header>
      <section className="w-full max-w-[450px] mx-auto flex flex-wrap text-center justify-center items-center font-semibold pt-4 gap-4">
        <GradientButton
          href="/database"
          gradient="bg-gradient-to-r from-truePrimary to-trueSecondary"
        >
          View Database
        </GradientButton>
        <GradientButton
          targetBlank
          href="https://discord.gg/arENz9gzuj"
          gradient="bg-gradient-to-r from-truePrimary to-slate-700"
        >
          Join Discord
        </GradientButton>
      </section>
    </section>
  );
}
