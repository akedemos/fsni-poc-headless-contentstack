/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.contentstack.io",
        protocol: "https",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
