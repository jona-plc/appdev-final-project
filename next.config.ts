/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // <-- set to false to stop map double-initialization
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Add other experimental options here if needed
  },
};

module.exports = nextConfig;
