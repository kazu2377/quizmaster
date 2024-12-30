/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // output: "export", // 静的HTMLのエクスポートを有効化
};

module.exports = nextConfig;
