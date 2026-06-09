import nextJest from "next/jest.js";
import type { Config } from "jest";

import baseConfig from "../../jest.config.base";

const createJestConfig = nextJest({
  dir: "./"
});

const config: Config = {
  ...baseConfig,
  displayName: "@valentines/landing",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/__tests__/**/*.test.ts", "<rootDir>/__tests__/**/*.test.tsx"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/app/globals.css",
    "!<rootDir>/src/lib/content/types.ts",
    "!<rootDir>/src/design-system/tokens/**"
  ]
};

export default createJestConfig(config);
