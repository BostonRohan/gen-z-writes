import fetch from "node-fetch";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";
import { Video } from "./addVideoSlug";

dotenv.config({ path: "../.env.local" });

const migrateVideos = async () => {
  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
      apiVersion: "2023-09-01", // we need this to get write access
      useCdn: false, // We can't use the CDN for writing
    });

    const videos = await client.fetch("*[_type == 'video']");

    for (let i = 0; i < videos.length; i++) {
      try {
        await client
          .patch(videos[i]._id)
          .set({
            url: videos[i].videoUrl,
          })
          .commit();

        console.log("document updated", videos[i].data.title);
      } catch (err) {
        // console.log("couldnt create record ---  err:", err);
      }
    }
  } catch (err) {
    console.error("there was an error getting the videos' data:", err);
  }
};

migrateVideos();
