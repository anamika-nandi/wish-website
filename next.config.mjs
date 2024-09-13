/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverActions: {
      allowedOrigins: ["partner.localhost:3000"],
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        protocol: "https",
        port: "",
      },
      {
        hostname: "vhxkjwczllimkfbbowmf.supabase.co",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
