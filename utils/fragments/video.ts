import { q, sanityImage } from "groqd";

const videoFragment = {
  _id: q.string(),
  title: q.string(),
  url: q.string(),
  slug: q.slug("slug"),
  tags: q.array(q.string()),
  author: q("author.ref")
    .deref()
    .grab({
      name: q.string(),
      slug: q.slug("slug"),
      image: sanityImage("image").nullable(),
    }),
};

export default videoFragment;
