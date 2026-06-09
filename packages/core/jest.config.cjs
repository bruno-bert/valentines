const baseConfig = require("../../jest.config.base.cjs");

module.exports = {
  ...baseConfig,
  displayName: "@valentines/core",
  rootDir: ".",
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  moduleNameMapper: {
    "^@valentines/core$": "<rootDir>/src/index.ts"
  }
};
