import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.177', '192.168.137.1'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "svzgtqqutbfjgxwmhbuk.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;