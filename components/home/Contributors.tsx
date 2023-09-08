import { bebasNeue } from "@/app/fonts";
import Contributor from "./Contributor";

export default function Contributors() {
  return (
    <section className="pt-80 px-4">
      <h2
        className={`${bebasNeue.className} xs:text-[100px] sm:leading-none text-[20vw] leading-[20vw] text-center text-slate-200 mb-4`}
      >
        Contributors
      </h2>
      <section className="flex justify-center gap-16">
        <Contributor
          name="Boston Rohan"
          src="/boston-headshot.jpg"
          alt="Boston Rohan"
        />
        <Contributor
          href="https://bostonrohan.com/"
          name="Boston Rohan"
          src="/boston-headshot.jpg"
          alt="Boston Rohan"
        />
      </section>
      <section className="flex justify-center mt-16 gap-16">
        <Contributor
          name="Boston Rohan"
          src="/boston-headshot.jpg"
          alt="Boston Rohan"
        />
        <Contributor
          name="Boston Rohan"
          src="/boston-headshot.jpg"
          alt="Boston Rohan"
        />
      </section>
    </section>
  );
}
