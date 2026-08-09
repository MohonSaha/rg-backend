import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        process: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-console": "warn",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-undef": "error",
    },
  },
  prettier,
];
