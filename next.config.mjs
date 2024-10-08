/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: process.env.NEXT_PUBLIC_BACKEND_API + "/:path*",
      },
    ];
  },
};

export default nextConfig;
