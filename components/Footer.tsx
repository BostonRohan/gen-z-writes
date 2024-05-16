import { Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4 text-slate-200 max-w-7xl mx-auto">
      <div className="flex justify-between gap-4 xs:flex-row flex-col">
        <div className="flex flex-col w-full h-full gap-1">
          <h3 className="opacity-50 font-semibold">Project Gen Z Writes</h3>
          <Link
            target="_blank"
            className="p-1 rounded-md bg-black/10 hover:bg-black/30 h-8 w-8"
            href="https://www.linkedin.com/company/projectgenzwrites/"
          >
            <Linkedin />
          </Link>
        </div>
        <div className="flex xs:gap-12 gap-6 flex-row opacity-80">
          <div className="flex flex-col">
            <h3 className="font-semibold">Content</h3>
            <Link className="opacity-70 hover:underline" href="/database">
              Database
            </Link>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold">Profile</h3>
            <Link className="opacity-70 hover:underline" href="/login">
              Login
            </Link>
            <Link
              className="opacity-70 hover:underline xs:whitespace-nowrap"
              href="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="flex mt-4 gap-2 opacity-60 text-sm">
        <Link className="hover:underline" href="/privacy-policy">
          Privacy Policy
        </Link>
        <Link className="hover:underline" href="/terms-of-service">
          Terms Of Service
        </Link>
      </div>
    </footer>
  );
}
