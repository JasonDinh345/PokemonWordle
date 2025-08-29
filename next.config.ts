import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: [
    'http://10.0.0.202:3000', // LAN IP for your phone
    'http://localhost:3000',  // optional for desktop
  ],
};

export default nextConfig;
