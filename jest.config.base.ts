import type { Config } from "jest";

const baseConfig: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: "v8",
  coverageReporters: ["text", "lcov"],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/", "/.next/", "/coverage/"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/.next/", "/coverage/"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {}]
  }
};

export default baseConfig;
