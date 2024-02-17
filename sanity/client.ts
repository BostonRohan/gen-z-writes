import { ClientConfig, createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  // set CDN to live API in development mode
  useCdn: process.env.NODE_ENV === "development" ? true : false,
  token: process.env.SANITY_API_TOKEN,
};

export default createClient(config);
