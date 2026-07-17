import type { MDXComponents } from 'mdx/types'

// Required at the project root by @next/mdx on the App Router.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components }
}
