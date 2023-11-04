import { bebasNeue } from "@/app/fonts";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedAuthor() {
  return (
    <section className="pt-[calc(30vh_-_4px)] text-slate-200 text-center">
      <h2 className={`text-6xl ${bebasNeue.className}`}>Featured Author</h2>
      <h3 className="text-3xl font-bold">Abigail Tarttelin</h3>
      <Image
        src="https://cdn.sanity.io/images/oud5udhr/production/19183b64273b974292beeef5cc68cf6f451e8f49-1080x1058.jpg"
        width={500}
        height={500}
        className="mx-auto mt-10 rounded-md shadow-2xl shadow-trueSecondary"
        alt="Abigail Tarttelin"
      />
      <Link
        className="flex items-center justify-center gap-2 mt-12 text-white text-lg font-semibold relative hover:text-slate-200"
        href="/author/abigail-tarttelin">
        Learn More <ArrowRight />
      </Link>
    </section>
  );
}
