import { bebasNeue } from "@/app/fonts";
import { Quote, Heart, BookOpen, Users } from "lucide-react";
import Footer from "@/components/Footer";

export default function Philosophy() {
  return (
    <main className="py-10 px-4 mx-auto max-w-3xl">
      <div className="text-center mb-12">
        <p className="font-handwriting text-2xl text-ink-muted -rotate-1 mb-2">
          What drives us
        </p>
        <h1
          className={`${bebasNeue.className} sm:text-[76px] sm:leading-none text-5xl text-ink`}
        >
          Our Philosophy
        </h1>
      </div>

      <div className="paper-card p-6 sm:p-10 rounded-lg relative">
        <Quote className="absolute -top-4 -left-2 w-10 h-10 text-brandPrimary/30 rotate-180" />

        <p className="leading-9 text-ink font-serif text-lg">
          <span className="font-handwriting text-4xl text-brandPrimary float-left mr-2 mt-1">
            P
          </span>
          rojectGenZWrites is a fast-growing, youth-led, non-profit database
          that educates the next generation of{" "}
          <span className="highlight">novelists</span>,{" "}
          <span className="highlight">poets</span>,{" "}
          <span className="highlight">journalists</span>, and{" "}
          <span className="highlight">creative visionaries</span>.
        </p>

        <p className="leading-9 text-ink-light font-serif text-lg mt-6">
          We believe in the power of communal nurturing and building a world
          that is kinder, stronger, and healthier due to the plethora of
          creative people in it. Yet, we recognized a gap that stood in the way
          of getting to that place.{" "}
          <strong className="text-ink">
            Money and its connection to accessibility of vital education.
          </strong>
        </p>

        <p className="leading-9 text-ink-light font-serif text-lg mt-6">
          This is why we partner with published authors, who generously give us
          their time to create videos sharing their incredible knowledge with
          our viewers. Videos are about anything within the writing process,
          from publishing to creative exhaustion. They are available on the
          website free of charge, aligning with our goal to{" "}
          <span className="pencil-underline">
            bridge the creative education gap
          </span>{" "}
          and give everyone a chance to pursue their creative passions.
        </p>

        <Quote className="absolute -bottom-4 -right-2 w-10 h-10 text-brandPrimary/30" />
      </div>

      {/* Values section */}
      <div className="grid sm:grid-cols-3 gap-6 mt-12">
        <div className="paper-card p-6 rounded-lg text-center">
          <Heart className="w-8 h-8 text-brandPrimary mx-auto mb-3" />
          <h3 className="font-semibold text-ink mb-2">Community First</h3>
          <p className="text-sm text-ink-muted">
            Building connections between aspiring writers and published authors
          </p>
        </div>
        <div className="paper-card p-6 rounded-lg text-center">
          <BookOpen className="w-8 h-8 text-brandPrimary mx-auto mb-3" />
          <h3 className="font-semibold text-ink mb-2">Free Education</h3>
          <p className="text-sm text-ink-muted">
            Quality writing education should be accessible to everyone
          </p>
        </div>
        <div className="paper-card p-6 rounded-lg text-center">
          <Users className="w-8 h-8 text-brandPrimary mx-auto mb-3" />
          <h3 className="font-semibold text-ink mb-2">Youth-Led</h3>
          <p className="text-sm text-ink-muted">
            Created by young writers, for young writers
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
