import "global.css";
import { PLASMIC } from "../../plasmic-init";
import { PlasmicClientRootProvider } from "../../plasmic-init-client";
import { PlasmicComponent } from "@plasmicapp/loader-nextjs";
import { inter } from "../fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Database",
  description:
    "Explore our collection of videos, our database features a curated selection of videos that cover a wide range of topics, including writing tips, author interviews, and more. Watch and learn from experienced writers in the industry and discover new insights into the craft of writing.",
  creator: "Gen Z Writes",
  category: "Database",
  openGraph: {
    title: "Database",
    description:
      "Explore our collection of videos, our database features a curated selection of videos that cover a wide range of topics, including writing tips, author interviews, and more. Watch and learn from experienced writers in the industry and discover new insights into the craft of writing.",
  },
};

export default async function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const plasmicData = await PLASMIC.fetchComponentData("Footer");
  return (
    <main className={`bg-primary ${inter.className}`}>
      <PlasmicClientRootProvider prefetchedData={plasmicData}>
        {children}
        <PlasmicComponent component="Footer" />
      </PlasmicClientRootProvider>
    </main>
  );
}
