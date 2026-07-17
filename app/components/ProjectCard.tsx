import { Card } from './Card'
import styles from './ProjectCard.module.css'

export type ProjectCardProps = {
  name: string
  href: string
  description: string
  /** Craig's contribution to the product, shown below the description. */
  role?: string | null
  /** Owning company or publisher, shown next to the name. */
  org?: string | null
  /** Renders the description as italic placeholder copy. */
  descriptionIsPlaceholder?: boolean
}

/** A linked project or product: name, optional org, short description. */
export function ProjectCard({
  name,
  href,
  description,
  role = null,
  org = null,
  descriptionIsPlaceholder = false,
}: ProjectCardProps) {
  return (
    <Card>
      <h3 className={styles.name}>
        <a href={href}>{name}</a>
        {org ? <span className={styles.org}> · {org}</span> : null}
      </h3>
      <p
        className={`${styles.description} ${
          descriptionIsPlaceholder ? styles.placeholder : ''
        }`}
      >
        {description}
      </p>
      {role ? <p className={styles.role}>Role: {role}</p> : null}
    </Card>
  )
}
