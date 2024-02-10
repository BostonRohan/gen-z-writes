import { bebasNeue } from "@/app/fonts";
import Contributor from "./Contributor";
import Marquee from "react-fast-marquee";

export default function Contributors() {
  return (
    <section className="pt-80">
      <h2
        className={`${bebasNeue.className} sm:text-[76px] sm:leading-none px-4 text-[16vw] leading-[16vw] text-center text-slate-200 mb-4`}>
        Contributors
      </h2>
      <div className="lg:hidden">
        <Marquee
          pauseOnClick
          pauseOnHover
          autoFill
          gradient
          gradientColor="#1b1b1d"
          className="max-w-4xl mx-auto flex gap-4">
          <Contributor name="Ruby Seidner" src="/ruby.webp" />
          <Contributor
            href="https://bostonrohan.com/"
            name="Boston Rohan"
            src="/boston.jpg"
          />
          <Contributor name="Randi Seidner" src="/randi.webp" />
          <Contributor name="Shannan Johnson" src="/shannan.jpeg" />
        </Marquee>
      </div>
      <div className="lg:flex justify-center hidden">
        <Contributor name="Ruby Seidner" src="/ruby.webp" />
        <Contributor
          href="https://bostonrohan.com/"
          name="Boston Rohan"
          src="/boston.jpg"
        />
        <Contributor name="Randi Seidner" src="/randi.webp" />
        <Contributor name="Shannan Johnson" src="/shannan.jpeg" />
      </div>
    </section>
  );
}
