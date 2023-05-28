import { Author } from "./addAuthorData";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env.local" });

const getAuthors = async () => {
  try {
    const getAuthorsRes = await fetch(
      `https://studio.plasmic.app/api/v1/cms/databases/${process.env.NEXT_PUBLIC_CMS_ID}/tables/artist/query`,
      {
        headers: {
          "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN}`,
        },
      }
    );

    const data = (await getAuthorsRes.json()) as { rows: Author[] };
    const authors = data.rows;

    console.log(authors);
  } catch (err) {
    console.error(err);
  }
};

getAuthors();
