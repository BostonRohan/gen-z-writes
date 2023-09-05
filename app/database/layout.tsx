import "global.css";
import { inter } from "../fonts";
import { Metadata } from "next";
import Nav from "@/components/Nav";

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
    url: "https://www.projectgenzwrites.com/",
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default async function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={`bg-primary ${inter.className}`}></main>;
}
