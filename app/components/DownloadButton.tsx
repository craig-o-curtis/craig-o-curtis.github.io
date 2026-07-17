import type { ReactNode } from 'react'
import styles from './DownloadButton.module.css'

type DownloadButtonProps = {
  href: string
  children: ReactNode
  /** Appended to the link's accessible name, e.g. "PDF, 2 pages". */
  fileInfo?: string
}

/** A download link styled as a button. */
export function DownloadButton({
  href,
  children,
  fileInfo,
}: DownloadButtonProps) {
  return (
    <a className={styles.button} href={href} download>
      {children}
      {fileInfo ? <span className="sr-only"> ({fileInfo})</span> : null}
      <span aria-hidden="true"> ↓</span>
    </a>
  )
}
