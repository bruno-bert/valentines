const baseConfig = require("../../jest.config.base.cjs");

module.exports = {
  ...baseConfig,
  displayName: "@valentines/content-management",
  rootDir: ".",
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  moduleNameMapper: {
    "^@valentines/content-management$": "<rootDir>/src/index.ts"
  }
};
