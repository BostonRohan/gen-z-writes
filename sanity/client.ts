import { ClientConfig, createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";
import { makeSafeQueryRunner } from "groqd";

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "development" ? true : false,
  token: process.env.SANITY_API_TOKEN,
};

const client = createClient(config);

const runQuery = makeSafeQueryRunner<{ tags?: string[] }>(
  (query, options) => {
    const parameters = options?.parameters ?? {};
    const tags = options?.tags;
    return client.fetch(query, parameters, tags ? { next: { tags } } : {});
  },
);

export { client, runQuery, config };
