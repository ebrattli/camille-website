import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  // tseslint.config.recommended,
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: tseslint.configs.recommended.parserOptions,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    ignores: ["node_modules", "dist/", "public/", ".astro/"],
  },
];
