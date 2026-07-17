import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // Static export cannot run the image optimizer.
  images: { unoptimized: true },
  // No basePath/assetPrefix: this is a user site served at the domain root,
  // not a project site under /repo-name/.
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
