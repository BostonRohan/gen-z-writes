import js from "@eslint/js";
import nextPlugin from "eslint-config-next";

const config = [
  js.configs.recommended,
  ...nextPlugin,
  {
    ignores: ["**/dist/**", "**/*.d.ts"],
  },
];

export default config;