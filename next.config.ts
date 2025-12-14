import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/urds',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
