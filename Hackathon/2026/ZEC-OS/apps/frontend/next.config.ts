import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Expose VERSION from .env.local to client-side as NEXT_PUBLIC_VERSION
    NEXT_PUBLIC_VERSION: process.env.VERSION ?? '1.1.2',
    NEXT_PUBLIC_BBS_VERSION: process.env.BBS_VERSION ?? 'v0.18b',
  },
};

export default nextConfig;
