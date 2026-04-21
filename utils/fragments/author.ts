import { InferFragmentType } from "groqd";
import { q } from "@/sanity/groqd";

const authorFragment = q.fragmentForType<"author">().project((sub) => ({
  _id: true,
  name: true,
  slug: true,
  bio: true,
  image: sub.field("image"),
  books: sub.field("books[]").project({
    title: true,
    url: true,
    cover: true,
  }),
  socials: true,
  videos: sub.field("videos[]").deref().project({
    slug: true,
    title: true,
    url: true,
  }),
}));

export type AuthorFragment = InferFragmentType<typeof authorFragment>;
export default authorFragment;
