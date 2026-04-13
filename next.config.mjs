/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'jbgarchitects.com',
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
}

export default nextConfig
