import { InferFragmentType } from "groqd";
import { q } from "@/sanity/groqd";

const videoFragment = q.fragmentForType<"video">().project((sub) => ({
  _id: true,
  title: true,
  url: true,
  slug: true,
  tags: true,
  author: sub.field("author.ref").deref().project({
    name: true,
    slug: true,
    image: true,
  }),
}));

export type VideoFragment = InferFragmentType<typeof videoFragment>;
export default videoFragment;
