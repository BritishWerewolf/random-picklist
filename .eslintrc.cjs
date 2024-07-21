/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  plugins: [
    '@stylistic/ts',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: [
    // Shadcn components shouldn't be checked.
    'src/components/ui/*',
  ],
  rules: {
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/component-tags-order': ['error', { 'order': [ 'script', 'template', 'style' ] }],
    'vue/match-component-file-name': ['error', {
      'extensions': ['vue'],
      'shouldMatchCase': true,
    }],
    'vue/max-attributes-per-line': ['error', {
      'singleline': { 'max': 3 },
      'multiline': { 'max': 1 },
    }],
    'vue/multi-word-component-names': 'off',
    'vue/no-console': 'error',
    'vue/singleline-html-element-content-newline': 'off',

    '@stylistic/ts/indent': ['error', 2],

    'curly': 'error',
    'eqeqeq': 'error',
    'func-name-matching': 'error',
    'no-dupe-else-if': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-irregular-whitespace': 'error',
    'no-loss-of-precision': 'error',
    //'no-magic-numbers': ['error', { 'ignoreArrayIndexes': true, 'ignoreClassFieldInitialValues': true }],
    'no-negated-condition': 'error',
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-unused-vars': 'error',
    'no-compare-neg-zero': 'error',
    'no-var': 'error',
    'sort-vars': ['error', { 'ignoreCase': true }],
    'semi': ['error', 'always'],
    'use-isnan': 'error',
    'yoda': 'error',
  },
};
