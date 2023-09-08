import Image from "next/image";
import ConditionalLink from "../global/ConditionalLink";

export default function Contributor({
  src,
  alt,
  name,
  href,
}: {
  src: string;
  alt: string;
  name: string;
  href?: string;
}) {
  return (
    <article>
      <Image
        src={src}
        width={200}
        height={200}
        alt={alt}
        className="rounded-xl mb-4 hover:shadow-[0_0_2rem_-0.5rem_#fff8]"
      />
      <ConditionalLink href={href} target="_blank">
        <h3 className="text-lg text-center text-opacity-50 hover:text-opacity-80 text-slate-200 font-semibold">
          {name}
        </h3>
      </ConditionalLink>
    </article>
  );
}
