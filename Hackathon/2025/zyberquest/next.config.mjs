/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // usa la IP de la laptop Ubuntu (donde corre el backend)
      { source: '/api/:path*', destination: 'http://192.168.100.12:3001/api/:path*' },
    ];
  },
};
export default nextConfig;
