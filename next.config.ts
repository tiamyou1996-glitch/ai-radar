import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserPage = repositoryName?.endsWith(".github.io");
const basePath =
  process.env.GITHUB_ACTIONS && repositoryName && !isUserPage ? `/${repositoryName}` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
