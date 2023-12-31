module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:svelte/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    extraFileExtensions: [".svelte"],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
  rules: {
    "import/order": [
      "warn",
      {
        alphabetize: { order: "asc" },
        pathGroups: [
          { pattern: "$app/**", group: "external", position: "after" },
          { pattern: "$lib/**", group: "external", position: "after" },
        ],
        groups: ["builtin", "external", "internal", "parent", ["sibling", "index"]],
        "newlines-between": "never",
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-empty": "warn",
  },
}
