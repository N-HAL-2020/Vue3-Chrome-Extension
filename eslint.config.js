import eslintConfig from '@eslint/js'
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsEslintParser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import vueParser from 'vue-eslint-parser'

/**
 * ESLint Config for TypeScript
 * @type {import('eslint').Linter.FlatConfig}
 */
const tsEslintConfig = {
  plugins: {
    '@typescript-eslint': tsEslintPlugin,
  },
  files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
  languageOptions: {
    parserOptions: {
      parser: tsEslintParser,
      project: true,
      extraFileExtensions: ['.vue'],
    },
  },
  rules: {
    ...tsEslintPlugin.configs['eslint-recommended'].overrides[0].rules,
    // '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
  },
}

/**
 * ESLint Config
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  {
    ignores: ['**/dist/**/*', '**/node_modules/**/*', 'vite.config.js'],
  },
  eslintConfig.configs.recommended,
  tsEslintConfig,
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    rules: {},
    languageOptions: {
      parser: vueParser,
    },
  },
]
