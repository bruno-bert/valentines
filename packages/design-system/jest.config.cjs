const baseConfig = require("../../jest.config.base.cjs");

module.exports = {
  ...baseConfig,
  displayName: "@valentines/design-system",
  rootDir: ".",
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  moduleNameMapper: {
    "^@valentines/design-system$": "<rootDir>/src/index.ts"
  }
};
