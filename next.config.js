/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/wellness-over-everything',
  images: { unoptimized: true },
  trailingSlash: true,
}

module.exports = nextConfig
