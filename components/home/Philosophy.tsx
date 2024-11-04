import { bebasNeue } from "@/app/fonts";
import Link from "next/link";

export default function Philosophy() {
  return (
    <section className=" px-4 flex flex-col gap-24">
      <div className="flex flex-wrap justify-center gap-16">
        <article>
          <h2
            className={`${bebasNeue.className} sm:text-[76px] sm:leading-none text-[16vw] leading-[16vw]`}
          >
            Our Philosophy
          </h2>
          <p className="max-w-[650px] mx-auto  sm:leading-9 sm:text-lg leading-8">
            <span className="opacity-80">
              ProjectGenZWrites is a fast-growing, youth-led, non-profit
              database that educates the next generation of novelists, poets,
              journalists, and creative visionaries.{" "}
            </span>
            <Link
              href="/philosophy"
              className="underline opacity-80 hover:opacity-100"
            >
              Read more...
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
}
