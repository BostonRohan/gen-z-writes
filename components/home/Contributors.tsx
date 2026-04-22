import { bebasNeue } from "@/app/fonts";
import { Users } from "lucide-react";
import Contributor from "./Contributor";

export default function Contributors() {
  return (
    <section className="relative">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-2">
          <Users className="w-6 h-6 text-brandPrimary" />
          <p className="font-handwriting text-2xl text-ink-muted">
            The team behind it all
          </p>
        </div>
        <h2
          className={`${bebasNeue.className} sm:text-[76px] sm:leading-none px-4 text-[16vw] leading-[16vw] text-ink`}
        >
          Founders
        </h2>
      </div>

      <div className="flex justify-center flex-wrap gap-6">
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
