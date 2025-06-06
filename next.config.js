const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "_styles")],
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1400],
    minimumCacheTTL: 86400, // Cache images for 24 hours minimum
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleapis.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
