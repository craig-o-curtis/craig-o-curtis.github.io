import type { ReactNode } from 'react'
import styles from './Card.module.css'

/** Semantic list wrapper for a set of Cards. */
export function CardList({ children }: { children: ReactNode }) {
  return <ul className={styles.list}>{children}</ul>
}

/** A bordered container rendered as a list item. Presentational only. */
export function Card({ children }: { children: ReactNode }) {
  return <li className={styles.card}>{children}</li>
}
