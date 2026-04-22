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
    <article className="flex flex-col items-center justify-center max-w-[175px] shrink-0 mx-4 group">
      <div className="h-[175px] w-[175px] relative">
        {/* Paper frame effect */}
        <div className="absolute inset-0 paper-card rounded-full transform rotate-3 opacity-60" />
        <div className="absolute inset-0 paper-card rounded-full transform -rotate-2 opacity-80" />
        <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-paper-cream shadow-lg group-hover:shadow-xl transition-shadow">
          <Image
            src={src}
            fill
            sizes="(min-width: 175px) 175px, 100vw"
            className="object-cover"
            alt={name}
          />
        </div>
      </div>
      <ConditionalLink href={href} target="_blank">
        <h3
          className={`text-lg text-center mt-3 ${classNames({
            "hover:text-brandPrimary": href,
          })} text-ink font-semibold transition-colors`}
        >
          {name}
        </h3>
      </ConditionalLink>
    </article>
  );
}
