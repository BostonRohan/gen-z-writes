import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";

export default function GradientButton({
  gradient,
  href,
  children,
  scroll = true,
  textClassName,
  targetBlank,
  hoverGrow = true,
}: {
  gradient: string;
  href: string;
  children: ReactNode;
  scroll?: boolean;
  textClassName?: string;
  targetBlank?: boolean;
  hoverGrow?: boolean;
}) {
  return (
    <div className="flex justify-center">
      <div className="relative group">
        <div
          className={`absolute -inset-0.5 blur group-hover:blur-xl opacity-75 transition duration-500 group-hover:duration-200 group-hover:opacity-100 will-change-filter overflow-hidden ${gradient}`}
        />
        <Link
          target={targetBlank ? "_blank" : "_self"}
          scroll={scroll}
          href={href}
          role="button"
          className={classNames(
            "relative block duration-500 group-hover:duration-200",
            { "group-hover:scale-105": hoverGrow },
          )}
        >
          <span
            className={`block p-2 min-w-[134px] inset-0.5 rounded-lg ${gradient}`}
          >
            <span className={classNames(textClassName)}>{children}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
