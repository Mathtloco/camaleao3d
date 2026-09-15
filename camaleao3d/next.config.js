// Site 100% estático (sem API), publicável em GitHub Pages, Vercel ou
// Hostinger sem precisar de servidor Node rodando.
const repoName = 'camaleao3d'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_PAGES === 'true' ? `/${repoName}` : undefined,
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
}
module.exports = nextConfig
