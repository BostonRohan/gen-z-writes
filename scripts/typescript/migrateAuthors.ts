import fetch from "node-fetch";
import dotenv from "dotenv";
import { Author } from "./addAuthorData";
import { createClient } from "@sanity/client";

dotenv.config({ path: "../.env.local" });

const migrateAuthors = async () => {
  try {
    const getAuthors = await fetch(
      `https://studio.plasmic.app/api/v1/cms/databases/${process.env.NEXT_PUBLIC_CMS_ID}/tables/artist/query`,
      {
        headers: {
          "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN}`,
        },
      }
    );

    const data = (await getAuthors.json()) as { rows: Author[] };
    const authors: Author[] = data.rows;

    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
      apiVersion: "2023-09-01", // we need this to get write access
      useCdn: false, // We can't use the CDN for writing
    });

    for (let i = 0; i < authors.length; i++) {
      try {
        await client
          .patch(authors[i].id)
          .set({ name: authors[i].data.name.trim() })
          .commit();

        console.log("author updated", authors[i].data.name);
      } catch (err) {
        console.log("couldnt create record ---  err:", err);
      }
    }
  } catch (err) {
    console.error("there was an error getting the authors' data:", err);
  }
};

migrateAuthors();
