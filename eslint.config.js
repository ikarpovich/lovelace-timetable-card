const js = require("@eslint/js");

const browserGlobals = {
  Blob: "readonly",
  CustomEvent: "readonly",
  FileReader: "readonly",
  HTMLElement: "readonly",
  URL: "readonly",
  customElements: "readonly",
  document: "readonly",
  window: "readonly",
};

module.exports = [
  js.configs.recommended,
  {
    files: ["eslint.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
  },
  {
    files: ["timetable-card.js"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...browserGlobals,
        console: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn", { args: "none" }],
    },
  },
  {
    files: ["test/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        __dirname: "readonly",
        console: "readonly",
        require: "readonly",
      },
    },
  },
];
