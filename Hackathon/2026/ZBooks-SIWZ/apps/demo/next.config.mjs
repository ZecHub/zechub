/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Allow Next to resolve workspace-linked TS packages without a build step.
    externalDir: true,
  },
};

export default nextConfig;
