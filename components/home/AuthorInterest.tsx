import GradientButton from "../global/GradientButton";

export default function AuthorInterest() {
  return (
    <section className="pt-80 px-4 text-center pb-40">
      <h2 className="sm:text-5xl font-bold sm:leading-none text-[6vw] max-w-[850px] mx-auto leading-[7vw] text-slate-200 mb-4">
        Are you an author interested in{" "}
        <span className="gradient-text-animation">participating?</span>
      </h2>
      <p className="xs:text-lg text-slate-200 font-semibold opacity-50 xs:max-w-none max-w-[250px] mx-auto text-sm mb-4">
        Click below to send us an email to discuss next steps.
      </p>
      <GradientButton
        gradient="bg-gradient-to-r from-primary to-slate-700"
        href="mailto:projectgenzwrites@gmail.com"
      >
        Connect with us
      </GradientButton>
    </section>
  );
}
