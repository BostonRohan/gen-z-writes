import fetch from "node-fetch";
import dotenv from "dotenv";
import { getJson } from "serpapi";

dotenv.config({ path: "../../.env.local" });

export interface Video {
  id: string;
  createdAt: string;
  updatedAt: string;
  identifier: string;
  data: {
    title: string;
    link: string;
    type: string;
    author: string;
    slug: string;
  };
}

const addVideoSlug = async () => {
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
    const videos = data.rows;

    for (let i = 0; i < videos.length; i++) {
      let updatedVideo = {
        identifier: videos[i].identifier,
        data: {
          slug: videos[i].data.title
            .trim()
            .replace(/[^\w\s]/gi, "")
            .toLowerCase()
            .replace(/\s/gi, "-"),
        },
      };

      try {
        const postRes = await fetch(
          `https://studio.plasmic.app/api/v1/cms/rows/${videos[i].id}?publish=1`,
          {
            method: "PUT",
            headers: {
              "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.CMS_SECRET_TOKEN}`,
              "content-type": "application/json",
            },
            body: JSON.stringify(updatedVideo),
          }
        );
        const postResData = await postRes.json();
        console.log(
          `${videos[i].data.title} updated, updated body ----`,
          postResData
        );
      } catch (err) {
        console.error(
          `there was an error updating ${videos[i].data.title} data, err:`,
          err
        );
      }
    }
  } catch (err) {
    console.error("there was an error getting the authors' data:", err);
  }
};

addVideoSlug();
