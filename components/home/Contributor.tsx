import Image from "next/image";
import ConditionalLink from "../global/ConditionalLink";
import classNames from "classnames";

export default function Contributor({
  src,
  name,
  href,
}: {
  src: string;
  name: string;
  href?: string;
}) {
  return (
    <article className="flex flex-col items-center justify-center max-w-[175px] shrink-0 mx-4">
      <div className="h-[175px] w-[175px] relative">
        <Image
          src={src}
          fill
          sizes="(min-width: 175px) 175px, 100vw"
          className="object-cover rounded-full"
          alt={name}
        />
      </div>
      <ConditionalLink href={href} target="_blank">
        <h3
          className={`text-lg text-center ${classNames({
            "hover:text-opacity-80": href,
          })} text-opacity-60 text-slate-300 font-semibold`}>
          {name}
        </h3>
      </ConditionalLink>
    </article>
  );
}
