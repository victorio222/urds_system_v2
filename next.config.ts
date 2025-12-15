import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/urds',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://urds-system-backendv2.onrender.com/:path*'
      }
    ]
  }
};

export default nextConfig;
