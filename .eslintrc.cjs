/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "curly": "error",
    "eqeqeq": "error",
    "func-name-matching": "error",
    "no-dupe-else-if": "error",
    "no-duplicate-imports": "error",
    "no-else-return": "error",
    "no-irregular-whitespace": "error",
    "no-loss-of-precision": "error",
    //"no-magic-numbers": ["error", { "ignoreArrayIndexes": true, "ignoreClassFieldInitialValues": true }],
    "no-negated-condition": "error",
    "no-unreachable": "error",
    "no-unreachable-loop": "error",
    "no-unused-vars": "error",
    "no-use-before-define": "error",
    "no-compare-neg-zero": "error",
    "no-var": "error",
    "sort-vars": ["error", { "ignoreCase": true }],
    "semi": ["error", "always"],
    "use-isnan": "error",
    "yoda": "error",
  },
};