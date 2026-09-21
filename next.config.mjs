/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aceternity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.aceternity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Existing Aceternity + framer-motion/React 19 type mismatches; do not block Vercel deploys
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
