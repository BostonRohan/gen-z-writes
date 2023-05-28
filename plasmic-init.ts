import { initPlasmicLoader } from "@plasmicapp/loader-nextjs/react-server-conditional";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_ID ?? "",
      token: process.env.NEXT_PUBLIC_PLASMIC_TOKEN ?? "",
    },
  ],

  preview: process.env.NODE_ENV === "development",
});
