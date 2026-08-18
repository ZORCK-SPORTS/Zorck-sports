import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = process.env.GITHUB_PAGES_BASE_PATH ?? "/Zorck-sports";
const siteBasePath = isGitHubPages ? githubPagesBasePath : "";
const siteOrigin =
  process.env.GITHUB_PAGES_ORIGIN ??
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  (isGitHubPages
    ? "https://zorck-sports.github.io"
    : "https://zorck-sport.fagundessport.chatgpt.site");

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        assetPrefix: `${siteOrigin}${siteBasePath}`,
        trailingSlash: true,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: siteBasePath,
    NEXT_PUBLIC_SITE_ORIGIN: siteOrigin,
  },
};

export default nextConfig;
