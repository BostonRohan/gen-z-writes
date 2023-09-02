import fetch from "node-fetch";
import dotenv from "dotenv";
import { Author } from "./addAuthorData";
import { createClient } from "@sanity/client";
import { Video } from "./addVideoSlug";

dotenv.config({ path: "../.env.local" });

const migrateVideos = async () => {
  try {
    const getVideos = await fetch(
      `https://studio.plasmic.app/api/v1/cms/databases/${process.env.NEXT_PUBLIC_CMS_ID}/tables/videos/query`,
      {
        headers: {
          "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN}`,
        },
      }
    );

    const data = (await getVideos.json()) as { rows: Video[] };
    const videos: Video[] = data.rows;

    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
      apiVersion: "2023-09-01", // we need this to get write access
      useCdn: false, // We can't use the CDN for writing
    });

    console.log(videos);

    for (let i = 0; i < videos.length; i++) {
      try {
        if (videos[i].data.link && videos[i].data.link.length) {
          await client
            .patch(videos[i].id)
            .set({
              video: {
                owner: {
                  _type: "reference",
                  _ref: videos[i].data.author,
                },
              },
            })
            .commit();

          console.log("document updated", videos[i].data.title);
        }
      } catch (err) {
        console.log("couldnt create record ---  err:", err);
      }
    }
  } catch (err) {
    console.error("there was an error getting the videos' data:", err);
  }
};

migrateVideos();
