import type { AnchorHTMLAttributes, ReactNode } from 'react'

/** True for absolute http(s) URLs — anything leaving this site. */
export function isExternalHref(href: string) {
  return /^https?:\/\//.test(href)
}

type LinkProps = {
  href: string
  children: ReactNode
  /**
   * Open in a new tab. Defaults to true for external hrefs, false otherwise —
   * an in-page jump like the skip link would break in a new tab.
   */
  newTab?: boolean
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>

/**
 * An anchor that opens external links in a new tab by default, adds
 * rel="noreferrer", and tells screen readers it will do so.
 */
export function Link({ href, children, newTab, className, ...rest }: LinkProps) {
  const opensNewTab = newTab ?? isExternalHref(href)

  return (
    <a
      href={href}
      className={className}
      {...(opensNewTab ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      {children}
      {opensNewTab ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </a>
  )
}
