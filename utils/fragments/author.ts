import { q, sanityImage } from "groqd";

const authorFragment = {
  _id: q.string(),
  name: q.string(),
  slug: q.slug("slug"),
  bio: q.contentBlocks().nullable(),
  image: sanityImage("image").nullable(),
  website: q.string().nullable(),
  books: q
    .array(
      q.object({
        title: q.string(),
        url: q.string(),
        _key: q.string(),
        //sanityImage doesn't work here?
        cover: q.object({ asset: q.object({ _ref: q.string() }) }),
      })
    )
    .nullable(),
  videos: q("videos")
    .filter()
    .deref()
    .grab({
      slug: q.slug("slug"),
      title: q.string(),
      url: q.string(),
    }),
};

export default authorFragment;
