import fetch from "node-fetch";
import dotenv from "dotenv";
import { getJson } from "serpapi";

dotenv.config({ path: "../../.env.local" });

export interface Author {
  id: string;
  createdAt: string;
  updatedAt: string;
  identifier: string;
  data: {
    name: string;
    bio: string;
    slug: string;
  };
}

const addAuthorData = async () => {
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

    for (let i = 0; i < authors.length; i++) {
      let updatedAuthor = {
        identifier: authors[i].identifier,
        data: {
          slug: authors[i].data.name
            .trim()
            .replace(/[^\w\s]/gi, "")
            .toLowerCase()
            .replace(/\s/gi, "-"),
          website: "",
          socials: [],
          image: "",
          books: [],
        },
      };
      try {
        const googleResponse = await getJson("google", {
          api_key: process.env.SERP_API_KEY,
          q: authors[i].data.name,
        });
        const image = googleResponse.knowledge_graph?.header_images[0]?.image;
        const website = googleResponse.knowledge_graph?.website;
        const books = googleResponse.knowledge_graph?.books;
        const socials = googleResponse.organic_results?.map(
          ({
            title,
            link,
            source,
          }: {
            title: string;
            link: string;
            source: string;
          }) => {
            title;
            link;
            source;
          }
        );
        if (website) {
          updatedAuthor.data.website = website;
        }
        if (socials) {
          updatedAuthor.data.socials = socials;
        }
        if (image) {
          updatedAuthor.data.image = image;
        }
        if (books) {
          updatedAuthor.data.books = books;
        }
      } catch (err) {
        console.error(
          `there was an error getting google results for ${authors[i].data.name}, err:${err}`
        );
      }
      try {
        const postRes = await fetch(
          `https://studio.plasmic.app/api/v1/cms/rows/${authors[i].id}?publish=1`,
          {
            method: "PUT",
            headers: {
              "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.CMS_SECRET_TOKEN}`,
              "content-type": "application/json",
            },
            body: JSON.stringify(updatedAuthor),
          }
        );
        const postResData = await postRes.json();
        console.log(
          `${authors[i].data.name} updated, updated body ----`,
          postResData
        );
      } catch (err) {
        console.error(
          `there was an error updating ${authors[i].data.name} data, err:`,
          err
        );
      }
    }
  } catch (err) {
    console.error("there was an error getting the authors' data:", err);
  }
};

addAuthorData();
