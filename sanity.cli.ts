/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import "dotenv/config";
import { defineCliConfig } from "sanity/cli";

function assertValue(value: string | undefined, errorMessage: string): string {
  if (!value) {
    throw new Error(errorMessage);
  }

  return value;
}

const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    path: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./utils/**/*.{ts,tsx}"],
    schema: "./schema.json",
    generates: "./sanity.types.ts",
    overloadClientMethods: false,
  },
});
