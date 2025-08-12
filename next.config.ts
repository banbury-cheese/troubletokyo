import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // ppr: true,
    inlineCss: true,
    useCache: true,
  },
  sassOptions: {
    additionalData: `@import "styles/breakpoints.scss";`,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};

export default nextConfig;
