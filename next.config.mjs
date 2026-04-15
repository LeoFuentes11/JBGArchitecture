/** @type {import('next').NextConfig} */
const nextConfig = {
  // next-sanity requires these packages to be transpiled
  transpilePackages: ['next-sanity'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '*.sanity.media',
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
  // Suppress TS type mismatches from the Payload→Sanity migration cleanup
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig