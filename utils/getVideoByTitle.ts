const getVideoByTitle = async (slug: string) => {
  const apiUrl = new URL(
    `https://studio.plasmic.app/api/v1/cms/databases/${process.env.NEXT_PUBLIC_CMS_ID}/tables/videos/query`
  );

  //remove dashes and capatalize title
  const title = slug
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");

  apiUrl.search = new URLSearchParams({
    q: JSON.stringify({
      where: {
        title,
      },
      limit: 1,
    }),
  }).toString();

  return await fetch(apiUrl.toString(), {
    headers: {
      "x-plasmic-api-cms-tokens": `${process.env.NEXT_PUBLIC_CMS_ID}:${process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN}`,
    },
  });
};

export default getVideoByTitle;
