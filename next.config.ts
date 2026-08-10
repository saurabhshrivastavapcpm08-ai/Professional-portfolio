import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://formspree.io ws: wss: https:",
      "frame-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self' mailto:",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      { source: "/demos/yt", destination: "/demos/yt/index.html" },
      { source: "/demos/yt/:path*", destination: "/demos/yt/index.html" },
      { source: "/demos/tara", destination: "/demos/tara/index.html" },
      { source: "/demos/tara/:path*", destination: "/demos/tara/index.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/resume.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Saurabh_Shrivastava_Resume.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
