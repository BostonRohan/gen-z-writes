import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 px-4 text-slate-200 max-w-7xl mx-auto">
      <div className="flex justify-between gap-4">
        <h3 className="opacity-50 xs:text-base text-xs">
          Project Gen Z Writes
        </h3>
        <div className="flex flex-row xs:gap-12 gap-6 opacity-80">
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
            <Link className="opacity-70 hover:underline" href="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
