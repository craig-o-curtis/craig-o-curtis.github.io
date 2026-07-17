import { NAME, TITLE } from "./identity";
import styles from "./page.module.css";

const CV_PATH = "/assets/senior-software-engineer-cv.pdf";

const projects = [
  {
    name: "gmt",
    href: "https://github.com/burglekitt/gmt",
    desc: "“Give Me Temporal!” — a TypeScript library wrapping the Temporal API in string-in/string-out helpers to kill Date bugs. Published as @burglekitt/gmt.",
  },
  {
    name: "worktree",
    href: "https://github.com/burglekitt/worktree",
    desc: "A CLI for the daily Git worktree flow: create, copy .env, open the editor, clean up.",
  },
  {
    name: "run-cv",
    href: "https://github.com/burglekitt/run-cv",
    desc: "A mainframe-inspired terminal CV viewer built with Node, React and Ink. Try npx run-cv craig.",
  },
];

// TODO(craig): replace lorem with real descriptions before publishing.
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.";

const portfolio = [
  {
    name: "Literacy Pro",
    org: "Scholastic",
    href: "https://education.scholastic.com/education/programs/literacypro.html",
  },
  { name: "NoteAffect", org: null, href: "https://www.noteaffect.com/" },
  {
    name: "Cisco Networking Academy",
    org: "Cisco",
    href: "https://www.netacad.com/",
  },
  {
    name: "Micetro",
    org: "Men&Mice",
    href: "https://bluecatnetworks.com/products/micetro/",
  },
  { name: "CTP", org: "Corivo", href: "https://travelconnect.corivo.io/" },
  { name: "Nordic Visitor", org: null, href: "https://my.nordicvisitor.com/" },
  { name: "Iceland Tours", org: null, href: "https://www.icelandtours.is/" },
  { name: "森林猫 / SenlinMao", org: null, href: "https://www.senlinmao.com/" },
];

const links = [
  { label: "GitHub", href: "https://github.com/craig-o-curtis" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/craigocurtis/" },
  { label: "@burglekitt", href: "https://github.com/burglekitt" },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.name}>{NAME}</h1>
      <p className={styles.title}>{TITLE}</p>

      <div className={styles.intro}>
        <p>
          I build frontends that hold up, and tools that take the tedious parts
          of the job out back. Mostly TypeScript, mostly on the web.
        </p>
        <p>
          I also read and speak Chinese, which is either unrelated or the whole
          point, depending on the day.
        </p>
      </div>

      <div className={styles.cta}>
        <a className={styles.download} href={CV_PATH} download>
          Download CV ↓
        </a>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Open source</h2>
        <ul className={styles.list}>
          {projects.map((p) => (
            <li key={p.name} className={styles.item}>
              <h3 className={styles.itemName}>
                <a href={p.href}>{p.name}</a>
              </h3>
              <p className={styles.itemDesc}>{p.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Products I&rsquo;ve worked on</h2>
        <ul className={styles.list}>
          {portfolio.map((p) => (
            <li key={p.name} className={styles.item}>
              <h3 className={styles.itemName}>
                <a href={p.href}>{p.name}</a>
                {p.org ? (
                  <span className={styles.itemMeta}> · {p.org}</span>
                ) : null}
              </h3>
              <p className={`${styles.itemDesc} ${styles.placeholder}`}>
                {LOREM}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Elsewhere</h2>
        <div className={styles.links}>
          {links.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
