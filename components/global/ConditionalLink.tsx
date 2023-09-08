import Link from "next/link";
import { ReactNode } from "react";

export default function ConditionalLink({
  href,
  target,
  children,
}: {
  href?: string;
  target?: "_blank";
  children: ReactNode;
}) {
  return href ? (
    <Link href={href} target={target ?? "_self"}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
}
