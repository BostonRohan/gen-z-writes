import { client } from "@/sanity/client";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { title, videoDownloadUrl, publication } = await request.json();

  try {
    const slug = title.toLowerCase().replace(/ /g, "-");

    const author = {
      _id: `drafts.${uuidv4()}`,
      _type: "author",
      name: title,
      slug: { current: slug },
      publication,
    };

    console.log(`Saving author ${JSON.stringify(author)} as draft to Sanity`);

    const author_response = await client.create(author);

    console.log(`Author ${JSON.stringify(author)} saved as draft to Sanity`);

    const video = {
      _type: "video",
      _id: `drafts.${uuidv4()}`,
      title,
      slug: { current: slug },
      url: videoDownloadUrl,
      author: {
        _type: "author",
        ref: {
          _ref: author_response._id,
        },
      },
    };

    console.log(`Saving video ${JSON.stringify(video)} as draft to Sanity`);

    await client.create(video);

    console.log(`Video ${JSON.stringify(video)} saved as draft to Sanity`);

    return new Response("", { status: 200 });
  } catch (err) {
    // TODO: Sentry
    console.error(err);

    return new Response(
      "Unable to create draft author and video record in Sanity",
      { status: 500 },
    );
  }
}
