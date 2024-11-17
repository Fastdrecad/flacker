module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["dist", "node_modules", "*.js", "*.cjs", "*.mjs"],
  env: {
    node: true,
    es2022: true
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
};
