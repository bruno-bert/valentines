import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: "./",
  transpilePackages: ["@nobu/content-landing", "@nobu/content-legal"],
  outputFileTracingRoot: path.join(appDir, "../.."),
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@nobu/content-legal": path.join(appDir, "../../packages/content-legal/src/index.ts")
    };

    return config;
  }
};

export default nextConfig;
