async function getContent() {
  const videoRes = await fetch(
    `https://studio.plasmic.app/api/v1/cms/databases/${process.env.NEXT_PUBLIC_CMS_ID}/tables/videos/query`,
    {
      headers: {
        "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN}`,
      },
    }
  );

  const writtenRes = await fetch(
    `https://studio.plasmic.app/api/v1/cms/databases/${process.env.NEXT_PUBLIC_CMS_ID}/tables/writtenSubmissions/query`,
    {
      headers: {
        "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN}`,
      },
    }
  );

  const videos = await videoRes.json();
  const written = await writtenRes.json();

  //get author data for videos
  for (let i = 0; i < videos.rows.length; i++) {
    try {
      const authorRes = await getAuthorById(videos.rows[i].data.author);
      const author = await authorRes.json();
      videos.rows[i].data.author = author.rows[0];
    } catch (err) {
      console.error(
        `there was an error getting data for author id: ${videos.rows[i].data.author}`
      );
    }
  }
  //get author data for written submissions
  for (let i = 0; i < written.rows.length; i++) {
    try {
      const authorRes = await getAuthorById(written.rows[i].data.author);
      const author = await authorRes.json();
      written.rows[i].data.author = author.rows[0];
    } catch (err) {
      console.error(
        `there was an error getting data for author id: ${videos.rows[i].data.author} within written submissions`
      );
    }
  }

  if (!videoRes.ok || !writtenRes.ok) {
    throw new Error("Failed to fetch data");
  }

  return { videos, written };
}

import CardGrid from "@/components/CardGrid";
import getAuthorById from "@/utils/getAuthorById";

export default async function Page() {
  const { videos, written } = await getContent();

  return <CardGrid videos={videos.rows} written={written.rows} />;
}
