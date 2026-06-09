import type { Config } from "jest";
import baseConfig from "../../jest.config.base";

const config: Config = {
  ...baseConfig,
  displayName: "@nobu/design-system",
  rootDir: ".",
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  moduleNameMapper: {
    "^@nobu/design-system$": "<rootDir>/src/index.ts"
  }
};

export default config;
