const getVideoBySlug = async (slug: string) => {
  const apiUrl = new URL(
    `https://studio.plasmic.app/api/v1/cms/databases/${process.env.NEXT_PUBLIC_CMS_ID}/tables/videos/query`
  );

  apiUrl.search = new URLSearchParams({
    q: JSON.stringify({
      where: {
        slug,
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

export default getVideoBySlug;
