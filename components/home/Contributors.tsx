import { bebasNeue } from "@/app/fonts";
import Contributor from "./Contributor";

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
