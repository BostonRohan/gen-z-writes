import "global.css";
import { PLASMIC } from "../../plasmic-init";
import { PlasmicClientRootProvider } from "../../plasmic-init-client";
import { PlasmicComponent } from "@plasmicapp/loader-nextjs";
import { inter } from "../fonts";

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
