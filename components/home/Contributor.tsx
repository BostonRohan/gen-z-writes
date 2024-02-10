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
      <Image
        src={src}
        width={175}
        height={175}
        alt={name}
        className="mb-4 h-[175px] rounded-[50%] w-[175px] overflow-hidden !object-cover"
      />
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
