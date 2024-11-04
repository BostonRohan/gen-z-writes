import { bebasNeue } from "@/app/fonts";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedAuthor() {
  return (
    <section className="text-center px-4">
      <h2
        className={`xs:text-6xl xs:leading-[1] text-[15vw] leading-[15vw] ${bebasNeue.className}`}
      >
        Featured Author
      </h2>
      <h3 className="text-3xl font-bold">Abigail Tarttelin</h3>
      <div className="w-full relative h-full aspect-square mb-12 mt-6 shadow-2xl shadow-brandSecondary max-h-[500px] max-w-[500px] mx-auto">
        <Image
          src="https://cdn.sanity.io/images/oud5udhr/production/772f40147dc6f4a3ee1ed898feeacc300e157a34-2263x3357.jpg"
          alt="Abigail Tarttelin"
          className="object-cover rounded-md"
          sizes="(min-width: 500px) 500px, 100vw"
          fill
          priority
        />
      </div>
      <Link
        className="flex items-center justify-center gap-2 text-white text-lg font-semibold relative"
        href="author/abigail-tarttelin"
      >
        Learn More <ArrowRight width={18} height={18} />
      </Link>
    </section>
  );
}
