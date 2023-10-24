import { createClient } from "next-sanity";
import { projectId, apiVersion, dataset } from "./env";

const client = ({ useCdn }: { useCdn?: boolean }) =>
  createClient({
    projectId,
    dataset,
    token: process.env.SANITY_API_TOKEN,
    apiVersion, // https://www.sanity.io/docs/api-versioning
    useCdn: useCdn ?? true, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
  });

export default client;
