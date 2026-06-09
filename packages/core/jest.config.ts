import type { Config } from "jest";
import baseConfig from "../../jest.config.base";

const config: Config = {
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

export default config;
