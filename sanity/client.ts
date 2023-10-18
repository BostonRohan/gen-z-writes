import { createClient } from "next-sanity";
import { projectId, apiVersion, dataset, token } from "./env";

const client = ({ useCdn }: { useCdn?: boolean }) =>
  createClient({
    projectId,
    dataset,
    apiVersion, // https://www.sanity.io/docs/api-versioning
    token,
    useCdn: useCdn ?? true, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
  });

export default client;
