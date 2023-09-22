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
    <article>
      <Image
        src={src}
        width={175}
        height={175}
        alt={name}
        className="mb-4 max-h-[175px] rounded-[50%] w-[175px] h-full overflow-hidden !object-cover "
      />
      <ConditionalLink href={href} target="_blank">
        <h3
          className={`text-lg text-center ${classNames({
            "hover:text-opacity-80": href,
          })} text-opacity-50 text-slate-200 font-semibold`}
        >
          {name}
        </h3>
      </ConditionalLink>
    </article>
  );
}
