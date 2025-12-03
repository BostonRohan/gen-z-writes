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
        className={`${bebasNeue.className} sm:text-[76px] sm:leading-none px-4 text-[16vw] leading-[16vw] text-center mb-4`}
      >
        Founders
      </h2>
      <div className="flex justify-center flex-wrap gap-4">
        <Contributor
          name="Ruby Seidner"
          src="/ruby.jpeg"
          href="/ruby-seidner"
        />
        <Contributor
          href="https://bostonrohan.com/"
          name="Boston Rohan"
          src="/boston.jpg"
        />
      </div>
    </section>
  );
}
