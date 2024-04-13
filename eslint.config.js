import eslintConfig from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";

/**
 * ESLint Config
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  {
    ignores: ["**/dist/**/*", "**/node_modules/**/*", "vite.config.js"],
  },
  eslintConfig.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    rules: {},
  },
];
