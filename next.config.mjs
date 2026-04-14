import { withPayload } from '@payloadcms/next/withPayload'

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
        hostname: 'jbg-architecture.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
  webpack: (config, { isServer }) => {
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
      '.jsx': ['.tsx', '.jsx'],
    }
    config.resolve.alias['pg-native'] = false

    // Prevent Node.js from trying to load CSS files as ESM modules
    // (react-image-crop and other Payload UI deps import CSS)
    if (isServer) {
      config.module.rules.push({
        test: /\.css$/,
        use: 'null-loader',
      })
    }

    return config
  },
  sassOptions: {
    includePaths: ['node_modules'],
  },
}

export default withPayload(nextConfig)
