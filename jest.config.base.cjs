const path = require("path");

/** @type {import('jest').Config} */
const baseConfig = {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: "v8",
  coverageReporters: ["text", "lcov"],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/", "/.next/", "/coverage/"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/.next/", "/coverage/"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      require.resolve("ts-jest", { paths: [path.resolve(__dirname)] }),
      {}
    ]
  }
};

module.exports = baseConfig;
