/** @type {import('next').NextConfig} */
const nextConfig = {};

const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1400],
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "the-wright-designs-website-images.s3.af-south-1.amazonaws.com",
        port: "",
        pathname: "/carevita-fit/**",
      },
    ],
  },
};
