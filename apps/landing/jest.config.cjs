const nextJest = require("next/jest.js");
const baseConfig = require("../../jest.config.base.cjs");

const createJestConfig = nextJest({
  dir: "./"
});

module.exports = createJestConfig({
  ...baseConfig,
  displayName: "@nobu/landing",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/__tests__/**/*.test.{ts,tsx}"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/app/globals.css",
    "!<rootDir>/src/lib/content/types.ts",
    "!<rootDir>/src/design-system/tokens/motion.ts"
  ],
  moduleNameMapper: {
    "^@nobu/content-landing$": "<rootDir>/../../packages/content-landing/src/index.ts"
  }
});
