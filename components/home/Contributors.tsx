import { bebasNeue } from "@/app/fonts";
import Contributor from "./Contributor";
import dynamic from "next/dynamic";
const Marquee = dynamic(() => import("react-fast-marquee"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center gap-4 overflow-hidden min-h-[219px]">
      <div className="mb-4 h-[175px] rounded-[50%] w-[175px] overflow-hidden !object-cover bg-slate-300 animate-pulse shrink-0" />
      <div className="mb-4 h-[175px] rounded-[50%] w-[175px] overflow-hidden !object-cover bg-slate-300 animate-pulse shrink-0" />
      <div className="mb-4 h-[175px] rounded-[50%] w-[175px] overflow-hidden !object-cover bg-slate-300 animate-pulse shrink-0" />
      <div className="mb-4 h-[175px] rounded-[50%] w-[175px] overflow-hidden !object-cover bg-slate-300 animate-pulse shrink-0" />
      <div className="mb-4 h-[175px] rounded-[50%] w-[175px] overflow-hidden !object-cover bg-slate-300 animate-pulse shrink-0" />
      <div className="mb-4 h-[175px] rounded-[50%] w-[175px] overflow-hidden !object-cover bg-slate-300 animate-pulse shrink-0" />
    </div>
  ),
});

export default function Contributors() {
  return (
    <section>
      <h2
        className={`${bebasNeue.className} sm:text-[76px] sm:leading-none px-4 text-[16vw] leading-[16vw] text-center text-slate-200 mb-4`}
      >
        Contributors
      </h2>
      <div className="lg:hidden">
        <Marquee
          pauseOnClick
          pauseOnHover
          autoFill
          gradient
          gradientColor="#1b1b1d"
          className="max-w-4xl mx-auto flex gap-4"
        >
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
