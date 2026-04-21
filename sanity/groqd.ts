import { createGroqBuilderWithZod, z } from "groqd";
import type {
  AllSanitySchemaTypes,
  internalGroqTypeReferenceTo,
} from "@/sanity.types";

type SchemaConfig = {
  schemaTypes: AllSanitySchemaTypes;
  referenceSymbol: typeof internalGroqTypeReferenceTo;
};

const q = createGroqBuilderWithZod<SchemaConfig>();

export { q, z };
