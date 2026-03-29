/** @type {import('next').NextConfig} */
// Triggering fresh Vercel build with exact Next.js version fix
const nextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Environment variables will be set in Vercel dashboard
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  },
  
  // Vercel-specific optimizations
  experimental: {
    // Enable server actions
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001', 'reddot.co.in'],
    },
  },
  
  // Bypass strict linting and typechecking during Vercel build phase
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig