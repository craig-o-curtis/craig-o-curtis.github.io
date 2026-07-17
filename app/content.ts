import type { ProjectCardProps } from '@/app/components/ProjectCard'

export const CV_PATH = '/assets/senior-software-engineer-cv.pdf'
export const CV_FILE_INFO = 'PDF, 2 pages'

export const intro = [
  'I build frontends that hold up, and tools that take the tedious parts of the job out back. Mostly TypeScript, mostly on the web.',
  'I also read and speak Chinese, which is either unrelated or the whole point, depending on the day.',
]

export const projects: ProjectCardProps[] = [
  {
    name: 'gmt',
    href: 'https://github.com/burglekitt/gmt',
    description:
      '“Give Me Temporal!” — a TypeScript library wrapping the Temporal API in string-in/string-out helpers to kill Date bugs. Published as @burglekitt/gmt.',
  },
  {
    name: 'worktree',
    href: 'https://github.com/burglekitt/worktree',
    description:
      'A CLI for the daily Git worktree flow: create, copy .env, open the editor, clean up.',
  },
  {
    name: 'run-cv',
    href: 'https://github.com/burglekitt/run-cv',
    description:
      'A mainframe-inspired terminal CV viewer built with Node, React and Ink. Try npx run-cv craig.',
  },
]

// TODO(craig): replace with real descriptions before these are seen widely.
const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'

const placeholder = { description: LOREM, descriptionIsPlaceholder: true }

export const portfolio: ProjectCardProps[] = [
  {
    name: 'Literacy Pro',
    org: 'Scholastic',
    href: 'https://education.scholastic.com/education/programs/literacypro.html',
    ...placeholder,
  },
  { name: 'NoteAffect', href: 'https://www.noteaffect.com/', ...placeholder },
  {
    name: 'Cisco Networking Academy',
    org: 'Cisco',
    href: 'https://www.netacad.com/',
    ...placeholder,
  },
  {
    name: 'Micetro',
    org: 'Men&Mice',
    href: 'https://bluecatnetworks.com/products/micetro/',
    ...placeholder,
  },
  {
    name: 'CTP',
    org: 'Corivo',
    href: 'https://travelconnect.corivo.io/',
    ...placeholder,
  },
  {
    name: 'Nordic Visitor',
    href: 'https://my.nordicvisitor.com/',
    ...placeholder,
  },
  {
    name: 'Iceland Tours',
    href: 'https://www.icelandtours.is/',
    ...placeholder,
  },
  {
    name: '森林猫 / SenlinMao',
    href: 'https://www.senlinmao.com/',
    ...placeholder,
  },
]

export const links = [
  { label: 'GitHub', href: 'https://github.com/craig-o-curtis' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/craigocurtis/' },
  { label: '@burglekitt', href: 'https://github.com/burglekitt' },
]
