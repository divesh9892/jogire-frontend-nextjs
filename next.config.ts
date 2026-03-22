import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allows SVG optimization, but neutralized by the security policy below
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Bypass the Next.js 16 private IP block in development
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd20ld9c13m2eci.cloudfront.net', // Your Free AWS CDN!
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
    ],
  },
};

export default nextConfig;