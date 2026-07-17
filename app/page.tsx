import { ActionButton } from '@/app/components/ActionButton'
import { CardList } from '@/app/components/Card'
import { Link } from '@/app/components/Link'
import { PerformanceAnalytics } from '@/app/components/PerformanceAnalytics'
import { ProjectCard } from '@/app/components/ProjectCard'
import { Section } from '@/app/components/Section'
import {
  CV_FILE_INFO,
  CV_PATH,
  intro,
  links,
  portfolio,
  projects,
} from './content'
import { NAME, TITLE } from './identity'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <main id="main" className={styles.main}>
        <header>
          <h1 className={styles.name}>{NAME}</h1>
          <p className={styles.title}>{TITLE}</p>
        </header>

        <div className={styles.intro}>
          {intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.cta}>
          <ActionButton
            variant="link"
            href={CV_PATH}
            fileInfo={CV_FILE_INFO}
            newTab
          >
            View CV
          </ActionButton>
          <ActionButton
            variant="download"
            href={CV_PATH}
            fileInfo={CV_FILE_INFO}
          >
            Download CV
          </ActionButton>
        </div>

        <Section title="Performance and Accessibility">
          <PerformanceAnalytics />
        </Section>

        <Section title="Open source">
          <CardList>
            {projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </CardList>
        </Section>

        <Section title="Products I’ve worked on">
          <CardList>
            {portfolio.map((product) => (
              <ProjectCard key={product.name} {...product} />
            ))}
          </CardList>
        </Section>

        <Section title="Elsewhere">
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </>
  )
}
