/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
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
