import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
    rules: {
      "no-undef": "off",
    },
  },
];
