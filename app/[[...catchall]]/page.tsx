import { PageMetadata, PlasmicComponent } from "@plasmicapp/loader-nextjs";
import { notFound } from "next/navigation";
import { PLASMIC } from "../../plasmic-init";
import { PlasmicClientRootProvider } from "../../plasmic-init-client";
import { Metadata } from "next";

interface PlasmicMetadata extends PageMetadata {
  canonical?: string;
}

export const dynamic = "force-static";

// Use revalidate if you want incremental static regeneration
export const revalidate = 60;

export default async function PlasmicLoaderPage({
  params,
  searchParams,
}: {
  params?: { catchall: string[] | undefined };
  searchParams?: Record<string, string | string[]>;
}) {
  const plasmicComponentData = await fetchPlasmicComponentData(
    params?.catchall
  );
  if (!plasmicComponentData) {
    notFound();
  }

  const { prefetchedData } = plasmicComponentData;
  if (prefetchedData.entryCompMetas.length === 0) {
    notFound();
  }

  const pageMeta = prefetchedData.entryCompMetas[0];

  return (
    <PlasmicClientRootProvider
      prefetchedData={prefetchedData}
      pageParams={pageMeta.params}
      pageQuery={searchParams}
    >
      <PlasmicComponent component={pageMeta.displayName} />
    </PlasmicClientRootProvider>
  );
}

async function fetchPlasmicComponentData(catchall: string[] | undefined) {
  const plasmicPath = "/" + (catchall ? catchall.join("/") : "");
  const prefetchedData = await PLASMIC.maybeFetchComponentData(plasmicPath);
  if (!prefetchedData) {
    notFound();
  }

  return { prefetchedData };
}

export async function generateStaticParams() {
  const pageModules = await PLASMIC.fetchPages();
  return pageModules.map((mod) => {
    const catchall =
      mod.path === "/" ? undefined : mod.path.substring(1).split("/");
    return {
      catchall,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params?: { catchall: string[] | undefined };
}): Promise<Metadata> {
  const plasmicPath =
    "/" + (params?.catchall ? params?.catchall.join("/") : "");
  const prefetchedData = await PLASMIC.maybeFetchComponentData(plasmicPath);
  if (!prefetchedData) {
    notFound();
  }
  const pageMeta = prefetchedData.entryCompMetas[0];
  const metaData = pageMeta.pageMetadata as PlasmicMetadata;

  return {
    title: metaData?.title,
    description:
      metaData?.description ??
      "Discover the power of words with Gen Z Writes. Get ready to unleash your writing potential with high-quality advice from award-winning authors.",
    openGraph: {
      title: metaData?.title ?? "Gen Z Writes",
      description:
        metaData?.description ??
        "Discover the power of words with Gen Z Writes. Get ready to unleash your writing potential with high-quality advice from award-winning authors.",
      images: [
        {
          url:
            metaData?.openGraphImageUrl ??
            "https://site-assets.plasmic.app/64c6038e269ed9367ffa5e31b6005910.png",
        },
      ],
    },
  };
}
