/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // In development, proxy /api/* to Express backend
    // In production, NEXT_PUBLIC_API_URL is used directly in axiosInstance
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/api/:path*',
            destination: 'http://localhost:5000/api/:path*',
          },
        ]
      : [];
  },
};

module.exports = nextConfig;
