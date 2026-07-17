import type { ComponentType, ReactNode } from 'react'
import { ArrowUpRight, ChartNoAxesColumn, Download } from 'lucide-react'
import { isExternalHref } from './Link'
import styles from './ActionButton.module.css'

type IconComponent = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>

/**
 * Each variant fixes both its default icon and its link semantics, so a link
 * cannot accidentally download and a download cannot accidentally not.
 */
const VARIANT_ICON: Record<ActionButtonVariant, IconComponent> = {
  download: Download,
  link: ArrowUpRight,
  analytics: ChartNoAxesColumn,
}

export type ActionButtonVariant = 'download' | 'link' | 'analytics'

type ActionButtonProps = {
  variant: ActionButtonVariant
  href: string
  children: ReactNode
  /** Appended to the accessible name, e.g. "PDF, 2 pages". */
  fileInfo?: string
  /** Overrides the variant's default icon. Pass null to render no icon. */
  icon?: IconComponent | null
  /** Force a new tab for a same-origin href. External hrefs do this anyway. */
  newTab?: boolean
}

/**
 * A link styled as a button. One appearance, three intents.
 *
 * - download: saves the file  (adds the download attribute)
 * - link:     navigates       (external links open in a new tab)
 * - analytics: navigates to a metrics view
 */
export function ActionButton({
  variant,
  href,
  children,
  fileInfo,
  icon,
  newTab = false,
}: ActionButtonProps) {
  const Icon = icon === undefined ? VARIANT_ICON[variant] : icon
  // A download never navigates, so a new tab would be meaningless there.
  const opensNewTab =
    variant !== 'download' && (isExternalHref(href) || newTab)

  return (
    <a
      className={styles.button}
      href={href}
      {...(variant === 'download' ? { download: true } : {})}
      {...(opensNewTab ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {Icon ? <Icon className={styles.icon} aria-hidden={true} /> : null}
      <span>{children}</span>
      {fileInfo ? <span className="sr-only"> ({fileInfo})</span> : null}
      {opensNewTab ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </a>
  )
}
