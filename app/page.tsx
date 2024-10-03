import Hero from "@/components/home/Hero";
import Philosophy from "@/components/home/Philosophy";
import Contributors from "@/components/home/Contributors";
import AuthorInterest from "@/components/home/AuthorInterest";
import { Metadata } from "next";
import sharedOGImage from "../lib/sharedOg";
import FeaturedAuthor from "@/components/home/FeaturedAuthor";
import Footer from "@/components/Footer";

const title = "Project Gen Z Writes";
const description =
  "Explore Project Gen Z Writes: Your Gateway to an Inspirational Literary Social Network, Igniting the Future of Literary Changemakers. Dive into a world of creativity and innovation.";

export const metadata: Metadata = {
  title,
  description,
  category: title,
  openGraph: {
    title,
    url: "https://www.projectgenzwrites.com/",
    description,
    ...sharedOGImage,
  },
  twitter: {
    card: "summary",
    title,
    description,
    ...sharedOGImage,
  },
};

export default async function Home() {
  return (
    <div className="space-y-28 sm:pt-32 pt-20">
      <Hero />
      <FeaturedAuthor />
      <Philosophy />
      <Contributors />
      <AuthorInterest />
      <Footer />
    </div>
  );
}
