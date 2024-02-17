import "server-only";
import { type QueryParams } from "@sanity/client";
import client from "./client";

export async function sanityFetch<QueryResponse>({
  query,
  qParams,
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    // disable cache in development
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    next: { tags },
  });
}
