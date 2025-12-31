const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "_styles")],
  },
  images: {
    deviceSizes: [400, 800, 1400],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleapis.com",
        pathname: "**",
      },
    ],
    qualities: [50, 75],
  },
};

module.exports = nextConfig;
