/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@specboard/core", "@specboard/db", "@specboard/ui"],
};

export default nextConfig;
