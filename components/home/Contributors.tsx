import { bebasNeue } from "@/app/fonts";
import Contributor from "./Contributor";

export default function Contributors() {
  return (
    <section className="pt-80 px-4">
      <h2
        className={`${bebasNeue.className} xs:text-[100px] sm:leading-none text-[20vw] leading-[20vw] text-center text-slate-200 mb-4`}>
        Contributors
      </h2>
      <section className="flex justify-center gap-16 flex-wrap">
        <Contributor name="Ruby Seidner" src="/ruby.webp" />

        <Contributor
          href="https://bostonrohan.com/"
          name="Boston Rohan"
          src="/boston.jpg"
        />
      </section>
      <section className="flex justify-center [@media(min-width:445px)]:mt-16 mt-32 gap-16 flex-wrap">
        <Contributor name="Randi Seidner" src="/randi.webp" />
        <Contributor name="Shannan Johnson" src="/shannan.jpeg" />
      </section>
    </section>
  );
}
