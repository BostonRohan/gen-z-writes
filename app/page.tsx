import { bebasNeue } from "./fonts";

export default function Home() {
  return (
    <>
      <header className="pt-40 text-center text-slate-200 px-4">
        <h1
          className={`${bebasNeue.className} xs:text-8xl text-[20vw] xs:leading-none leading-[0.9]`}
        >
          <div className="whitespace-nowrap xs:leading-[80px] leading-none">
            Project{" "}
            <span className="gradient-text-animation whitespace-nowrap">
              Gen Z
            </span>{" "}
          </div>
          Writes
        </h1>
        <p className="max-w-[450px] mx-auto font-semibold opacity-60 xs:text-2xl text-lg">
          An inspirational database to create the next generation of{"  "}
          <span className="type-animation">
            <span>literary changemakers</span>
          </span>
        </p>
      </header>
    </>
  );
}
