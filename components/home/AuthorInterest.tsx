import GradientButton from "../global/GradientButton";

export default function AuthorInterest() {
  return (
    <section className="pt-80 px-4 text-center pb-40">
      <h2 className="sm:text-5xl font-bold sm:leading-none text-[6vw] max-w-[850px] mx-auto leading-[7vw] text-slate-200 mb-4">
        Are you an author interested in{" "}
        <span className="gradient-text-animation">participating?</span>
      </h2>
      <GradientButton
        gradient="bg-gradient-to-r from-truePrimary to-slate-700"
        href="mailto:projectgenzwrites@gmail.com"
        textClassName="font-semibold">
        Connect With Us
      </GradientButton>
    </section>
  );
}
