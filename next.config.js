/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "unsplash.com",
      },
      {
        hostname: "picsum.photos",
      },
    ],
  },
};

module.exports = nextConfig;
