const baseConfig = require("../../jest.config.base.cjs");

module.exports = {
  ...baseConfig,
  displayName: "@valentines/content-landing",
  rootDir: ".",
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/types.ts"],
  moduleNameMapper: {
    "^@valentines/content-landing$": "<rootDir>/src/index.ts"
  }
};
