import { ReactNode } from "react";

export default function Error({ children }: { children: ReactNode }) {
  return (
    <p className="text-red-200 xs:text-sm text-xs first-letter:capitalize">
      {children}
    </p>
  );
}
