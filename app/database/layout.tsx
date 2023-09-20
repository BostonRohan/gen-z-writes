import "global.css";
import { inter } from "../fonts";
import { Metadata } from "next";
import Nav from "@/components/Nav";
import Link from "next/link";

const title = "Database";
const description =
  "Explore our collection of videos, our database features a curated selection of videos that cover a wide range of topics, including writing tips, author interviews, and more. Watch and learn from experienced writers in the industry and discover new insights into the craft of writing.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.projectgenzwrites.com/"),
  title,
  description,
  category: title,
  openGraph: {
    title,
    url: "https://www.projectgenzwrites.com/database",
    description,
    images: ["/gen-z-writes-og.png"],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/gen-z-writes-og.png"],
  },
};

export default async function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${inter.className}`}>
      <nav className="pt-4">
        <Link href="/" className="font-bold gradient-text-animation pl-24">
          Gen Z Writes
        </Link>
      </nav>
      {children}
    </main>
  );
}
