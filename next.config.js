// next.config.js (Corrected Format)

// 1. Remove the 'import type' line
// 2. Remove the ': NextConfig' type annotation
// 3. Remove the 'export default' line

const nextConfig = { // Keep this as a standard JS object definition
    /* config options here */
    basePath: '/urds',
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                // IMPORTANT: Ensure the /api is here for the rewrite fix
                destination: 'https://urds-system-backendv2.onrender.com/api/:path*' 
            }
        ]
    }
};

// Use the CommonJS export syntax
module.exports = nextConfig;