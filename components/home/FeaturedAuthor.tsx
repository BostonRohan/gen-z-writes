import { bebasNeue } from "@/app/fonts";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedAuthor() {
  return (
    <section className="pt-[calc(30vh_-_4px)] text-slate-200 text-center px-4">
      <h2
        className={`xs:text-6xl xs:leading-[1] text-[15vw] leading-[15vw] ${bebasNeue.className}`}>
        Featured Author
      </h2>
      <h3 className="text-3xl font-bold">Abigail Tarttelin</h3>
      <Image
        src="https://cdn.sanity.io/images/oud5udhr/production/772f40147dc6f4a3ee1ed898feeacc300e157a34-2263x3357.jpg"
        className="w-full h-full aspect-square mt-10 object-cover rounded-md shadow-2xl shadow-trueSecondary max-h-[500px] max-w-[500px] mx-auto"
        alt="Abigail Tarttelin"
        width={500}
        height={500}
      />
      <Link
        className="flex items-center justify-center gap-2 mt-12 text-white text-lg font-semibold relative hover:text-slate-200"
        href="/author/abigail-tarttelin">
        Learn More <ArrowRight />
      </Link>
    </section>
  );
}
