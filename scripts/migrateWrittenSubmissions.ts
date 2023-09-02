import fetch from "node-fetch";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: "../.env.local" });

interface WrittenSubmission {
  id: string;
  createdAt: string;
  updatedAt: string;
  identifier: string;
  data: {
    title: string;
    content: string;
    author: string;
  };
}

const migrateWrittenSubmissions = async () => {
  try {
    const getWrittenSubmissions = await fetch(
      `https://studio.plasmic.app/api/v1/cms/databases/${process.env.NEXT_PUBLIC_CMS_ID}/tables/writtenSubmissions/query`,
      {
        headers: {
          "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN}`,
        },
      }
    );

    const data = (await getWrittenSubmissions.json()) as {
      rows: WrittenSubmission[];
    };
    const writtenSubmissions: WrittenSubmission[] = data.rows;

    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
      apiVersion: "2023-09-01", // we need this to get write access
      useCdn: false, // We can't use the CDN for writing
    });

    console.log(writtenSubmissions);

    for (let i = 0; i < writtenSubmissions.length; i++) {
      const writtenSubmission = writtenSubmissions[i];
      try {
        await client.create({
          _type: "writtenSubmissions",
          _id: writtenSubmission.id,
          body: writtenSubmission.data.content,
          title: writtenSubmission.data.title,
          slug: {
            _type: "slug",
            current: writtenSubmission.data.title
              .trim()
              .replace(/\s+/g, "-")
              .toLowerCase(),
          },
          writtenSubmissions: {
            owner: {
              _type: "reference",
              _ref: writtenSubmission.data.author,
            },
          },
        });
        console.log("document created", writtenSubmission.data.title);
      } catch (err) {
        console.log("couldnt create record ---  err:", err);
      }
    }
  } catch (err) {
    console.error(
      "there was an error getting the writtenSubmissions' data:",
      err
    );
  }
};

migrateWrittenSubmissions();
