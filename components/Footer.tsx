import { PenLine, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4 max-w-7xl pb-8 pt-12 mx-auto border-t border-ink/10 mt-12">
      <div className="flex justify-between gap-8 xs:flex-row flex-col">
        <div className="flex flex-col w-full h-full gap-3">
          <div className="flex items-center gap-2 text-ink">
            <PenLine className="w-5 h-5 text-brandPrimary" />
            <h3 className="font-handwriting text-xl">Project Gen Z Writes</h3>
          </div>
          <p className="font-serif text-sm text-ink-muted max-w-[250px]">
            Empowering the next generation of literary changemakers.
          </p>
          <Link
            target="_blank"
            className="inline-flex items-center gap-2 text-ink-muted hover:text-brandPrimary transition-colors w-fit"
            href="https://www.linkedin.com/company/projectgenzwrites/"
          >
            <Linkedin className="w-5 h-5" />
            <span className="text-sm">Follow us</span>
          </Link>
        </div>
        <div className="flex xs:gap-12 gap-6 flex-row">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-ink">Content</h3>
            <Link
              className="hover:text-brandPrimary text-ink-muted transition-colors"
              href="/database"
            >
              Database
            </Link>
            <Link
              className="hover:text-brandPrimary text-ink-muted transition-colors"
              href="/resources"
            >
              Resources
            </Link>
          </div>
        </div>
      </div>
      <div className="flex mt-8 gap-4 text-sm border-t border-ink/10 pt-4">
        <Link
          className="hover:text-brandPrimary text-ink-muted transition-colors"
          href="/privacy-policy"
        >
          Privacy Policy
        </Link>
        <Link
          className="hover:text-brandPrimary text-ink-muted transition-colors"
          href="/terms-of-service"
        >
          Terms Of Service
        </Link>
      </div>
    </footer>
  );
}
