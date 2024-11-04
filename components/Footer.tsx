import { Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-3 max-w-7xl pb-4 mx-auto">
      <div className="flex justify-between gap-4 xs:flex-row flex-col">
        <div className="flex flex-col w-full h-full gap-1">
          <h3 className="font-semibold">Project Gen Z Writes</h3>
          <Link
            target="_blank"
            className="p-1 rounded-md h-8 w-8"
            href="https://www.linkedin.com/company/projectgenzwrites/"
          >
            <Linkedin className="hover:text-brandPrimary" />
          </Link>
        </div>
        <div className="flex xs:gap-12 gap-6 flex-row">
          <div className="flex flex-col">
            <h3 className="font-semibold">Content</h3>
            <Link
              className="hover:underline group text-muted-foreground"
              href="/database"
            >
              Database
            </Link>
            <Link
              className="group text-muted-foreground flex gap-1 items-center"
              href="/resources"
            >
              <span className="group-hover:underline">Resources</span>
              <span className="text-xs text-brandSecondary">New</span>
            </Link>
          </div>
          {/*   <div className="flex flex-col"> */}
          {/*     <h3 className="font-semibold">Profile</h3> */}
          {/*     <Link className="hover:underline" href="/login"> */}
          {/*       Login */}
          {/*     </Link> */}
          {/*     <Link */}
          {/*       className="hover:underline xs:whitespace-nowrap" */}
          {/*       href="/signup" */}
          {/*     > */}
          {/*       Sign Up */}
          {/*     </Link> */}
          {/*   </div> */}
        </div>
      </div>
      <div className="flex mt-4 gap-2 text-sm">
        <Link
          className="hover:underline text-muted-foreground"
          href="/privacy-policy"
        >
          Privacy Policy
        </Link>
        <Link
          className="hover:underline text-muted-foreground"
          href="/terms-of-service"
        >
          Terms Of Service
        </Link>
      </div>
    </footer>
  );
}
