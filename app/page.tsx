import Hero from "@/components/home/Hero";
import Philosophy from "@/components/home/Philosophy";
import Contributors from "@/components/home/Contributors";
import AuthorInterest from "@/components/home/AuthorInterest";
import { Metadata } from "next";

const title = "Project Gen Z Writes";
const description =
  "Explore Project Gen Z Writes: Your Gateway to an Inspirational Literary Social Network, Igniting the Future of Literary Changemakers. Dive into a world of creativity and innovation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.projectgenzwrites.com/"),
  title,
  description,
  category: title,
  openGraph: {
    title,
    url: "https://www.projectgenzwrites.com/",
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

export default async function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Contributors />
      <AuthorInterest />
    </>
  );
}
