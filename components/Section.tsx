import type { ReactNode } from 'react'
import styles from './Section.module.css'

type SectionProps = {
  title: string
  children: ReactNode
}

/** A titled page section: uppercase label, hairline rule, arbitrary content. */
export function Section({ title, children }: SectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  )
}
