import { type SchemaTypeDefinition } from "sanity";
import author from "./schemas/author";
import video from "./schemas/video";
import writtenSubmissions from "./schemas/writtenSubmissions";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, video, writtenSubmissions],
};
