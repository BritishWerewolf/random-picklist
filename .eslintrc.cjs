/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
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
    "vue/component-tags-order": ["error", { "order": [ "script", "template", "style" ] }],
    "vue/html-indent": ["error", 2, {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": []
    }],
    "vue/multi-word-component-names": "off",

    '@stylistic/ts/indent': ['error', 2],

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
    "no-compare-neg-zero": "error",
    "no-var": "error",
    "sort-vars": ["error", { "ignoreCase": true }],
    "semi": ["error", "always"],
    "use-isnan": "error",
    "yoda": "error",
  },
};
