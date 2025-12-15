
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/urds',
  async rewrites() {
    return [
      {
        // Source: Frontend requests /api/roles
        source: '/api/:path*',
        
        // Destination: Proxy sends request to https://.../api/roles
        destination: 'https://urds-system-backendv2.onrender.com/api/:path*' 
      }
    ]
  }
};