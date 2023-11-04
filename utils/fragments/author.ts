import { q, sanityImage } from "groqd";

const authorFragment = {
  _id: q.string(),
  name: q.string(),
  slug: q.slug("slug"),
  bio: q.contentBlocks(),
  image: sanityImage("image"),
  website: q.string().nullable(),
  books: q.array(
    q.object({
      title: q.string(),
      url: q.string(),
      _key: q.string(),
    })
  ),
  //   videos: q("video.ref")
  //     .deref()
  //     .grab({
  //       title: q.string(),
  //       slug: q.slug("slug"),
  //       url: q.string(),
  //       tags: q.array(q.string()),
  //     }),
};

export default authorFragment;
