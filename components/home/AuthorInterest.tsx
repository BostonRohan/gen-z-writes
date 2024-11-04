import GradientButton from "../global/GradientButton";

export default function AuthorInterest() {
  return (
    <section className="px-4 text-center">
      <h2 className="sm:text-5xl font-bold sm:leading-none text-[6vw] max-w-[850px] mx-auto leading-[7vw] mb-4">
        Are you an author interested in{" "}
        <span className="gradient-text-animation">participating?</span>
      </h2>
      <GradientButton
        gradient="bg-gradient-to-r from-brandPrimary to-brandSecondary"
        href="mailto:projectgenzwrites@gmail.com"
        textClassName="font-semibold"
      >
        Connect with us
      </GradientButton>
    </section>
  );
}
