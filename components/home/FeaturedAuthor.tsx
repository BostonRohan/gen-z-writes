import { bebasNeue } from "@/app/fonts";
import { ArrowRight, Star, BookMarked } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedAuthor() {
  return (
    <section className="text-center px-4 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-8 opacity-20 hidden sm:block">
        <Star className="w-8 h-8 text-brandPrimary fill-brandPrimary" />
      </div>
      <div className="absolute top-12 right-12 opacity-20 hidden sm:block">
        <BookMarked className="w-10 h-10 text-brandSecondary" />
      </div>

      <div className="inline-block">
        <p className="font-handwriting text-2xl text-ink-muted -rotate-2 mb-1">
          Meet our
        </p>
        <h2
          className={`xs:text-6xl xs:leading-[1] text-5xl ${bebasNeue.className} text-ink`}
        >
          Featured Author
        </h2>
      </div>

      <h3 className="text-3xl font-serif font-bold text-ink mt-2">
        Abigail Tarttelin
      </h3>

      <div className="relative w-full max-w-[500px] mx-auto mt-8">
        {/* Paper frame effect */}
        <div className="absolute inset-0 paper-card rounded-lg transform rotate-2 opacity-60" />
        <div className="absolute inset-0 paper-card rounded-lg transform -rotate-1 opacity-80" />

        <div className="relative w-full aspect-square shadow-xl rounded-lg overflow-hidden border-4 border-paper-cream">
          <Image
            src="https://cdn.sanity.io/images/oud5udhr/production/772f40147dc6f4a3ee1ed898feeacc300e157a34-2263x3357.jpg"
            alt="Abigail Tarttelin"
            className="object-cover"
            sizes="(min-width: 500px) 500px, 100vw"
            fill
            priority
          />
        </div>
      </div>

      <Link
        className="inline-flex items-center justify-center gap-2 text-ink text-lg font-semibold mt-8 hover:text-brandPrimary transition-colors group"
        href="author/abigail-tarttelin"
      >
        <span className="pencil-underline">Learn More</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </section>
  );
}
