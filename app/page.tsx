import { CardList } from '@/app/components/Card'
import { DownloadButton } from '@/app/components/DownloadButton'
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
          <DownloadButton href={CV_PATH} fileInfo={CV_FILE_INFO}>
            Download CV
          </DownloadButton>
        </div>

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
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </>
  )
}
