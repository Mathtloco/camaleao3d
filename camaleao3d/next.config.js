// Preview estático no GitHub Pages: GITHUB_PAGES=true ativa `output: export`.
// A versão real (Vercel/Hostinger, com API e Supabase) não usa essa variável
// e continua rodando normalmente em modo servidor.
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repoName = 'camaleao3d'

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubPages && {
    output: 'export',
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
}
module.exports = nextConfig
