/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: "./",
  images: {
    unoptimized: true
  },
  transpilePackages: ["@valentines/content-landing"]
};

export default nextConfig;
