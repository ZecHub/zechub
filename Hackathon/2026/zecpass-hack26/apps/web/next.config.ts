import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Server external packages that shouldn't be bundled
  serverExternalPackages: ['mongoose', 'bcrypt'],

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Strict mode for development
  reactStrictMode: true,

  // Enable experimental features
  experimental: {
    // Server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
