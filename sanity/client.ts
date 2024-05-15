import { ClientConfig, createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";
import { makeSafeQueryRunner } from "groqd";

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  // set CDN to live API in development mode
  useCdn: process.env.NODE_ENV === "development" ? true : false,
  token: process.env.SANITY_API_TOKEN,
};

const runQuery = makeSafeQueryRunner((query) => client.fetch(query));

const client = createClient(config);

export { client, runQuery, config };
