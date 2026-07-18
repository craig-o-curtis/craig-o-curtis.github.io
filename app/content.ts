import type { ProjectCardProps } from "@/app/components/ProjectCard";

export const CV_PATH = "/assets/senior-software-engineer-cv.pdf";
export const CV_FILE_INFO = "PDF, 2 pages";

export const intro = [
  "I build frontends that hold up, and tools that take the tedious parts of the job out back. Mostly TypeScript, mostly on the web.",
  "I also read and speak Chinese, which is either unrelated or the whole point, depending on the day.",
];

export const projects: ProjectCardProps[] = [
  {
    name: "gmt",
    href: "https://github.com/burglekitt/gmt",
    description:
      "“Give Me Temporal!”: a TypeScript library wrapping the Temporal API in string-in/string-out helpers to kill Date bugs. Published as @burglekitt/gmt.",
  },
  {
    name: "worktree",
    href: "https://github.com/burglekitt/worktree",
    description:
      "A CLI for the daily Git worktree flow: create, copy .env, open the editor, clean up.",
  },
  {
    name: "run-cv",
    href: "https://github.com/burglekitt/run-cv",
    description:
      "A mainframe-inspired terminal CV viewer built with Node, React and Ink. Try npx run-cv craig.",
  },
];

export const portfolio: ProjectCardProps[] = [
  {
    name: "Literacy Pro",
    org: "Scholastic",
    href: "https://education.scholastic.com/education/programs/literacypro.html",
    description:
      "An independent-reading platform where students find books, set goals, track reading progress and complete comprehension check-ins while teachers manage levels, recommendations and reporting.",
    role: "Key frontend architect. Built the onboarding flow and its CSS animation work, accessible interfaces for young learners, in-browser ebook navigation and audio playback tools.",
  },
  {
    name: "NoteAffect",
    href: "https://www.noteaffect.com/",
    description:
      "An AI-powered classroom engagement platform for live lesson capture, interactive note-taking, Q&A, multilingual captions, recordings and engagement analytics.",
    role: "Sole frontend architect for a period. Built the HTML canvas note-taking tool.",
  },
  {
    name: "Cisco Networking Academy",
    org: "Cisco",
    href: "https://www.netacad.com/",
    description:
      "Cisco's global learning platform for free and certification-aligned courses in networking, cybersecurity, programming, AI, data science and related career paths.",
    role: "Frontend developer. Built learning modules fed by large markdown-driven data sets, in Gatsby.",
  },
  {
    name: "Micetro",
    org: "Men&Mice",
    href: "https://bluecatnetworks.com/products/micetro/",
    description:
      "A browser-based DDI platform for managing DNS, DHCP and IPAM across on-prem, hybrid and cloud environments, including DNS zones, IP address space, reports, workflows and admin controls.",
    role: "Frontend developer and UI architect. Built out feature work, split the shared component and utility libraries, and led theming.",
  },
  {
    name: "CTP",
    org: "Corivo",
    href: "https://travelconnect.corivo.io/",
    description:
      "Corivo Travel Platform, a travel-operations system used by tour operators to automate business processes, integrate external services and manage day-to-day travel workflows.",
    role: "Frontend developer and UI / utility architect. Built the company-wide component and utility libraries, drove the migration off legacy and deprecated code, upgraded the data layer to TanStack Query, and designed the Temporal-only date utilities.",
  },
  {
    name: "Iceland Tours",
    href: "https://www.icelandtours.is/",
    description:
      "A Reykjavik-based travel site for self-drive, guided, private, camping and multi-day Iceland vacation packages with flexible dates, local planning and online booking.",
    role: "Key Frontend architect. Built the cross-app theming and localization for the shared monorepo behind this and SenlinMao.",
  },
  {
    name: "森林猫 / SenlinMao",
    href: "https://www.senlinmao.com/",
    description:
      "A Chinese-market travel site offering Iceland and Europe packages, including self-drive, group, private and camping trips with Chinese-language planning content.",
    role: "Key Frontend architect and localizer. Built the cross-app theming and localization with Iceland Tours, led the Chinese translation and localization, and fixed the date/time handling.",
  },
  {
    name: "Nordic Visitor Customer Portal",
    href: "https://my.nordicvisitor.com/",
    description:
      "A customer portal for Nordic Visitor travelers to access post-booking materials such as vouchers, travel documents, itinerary details and support information.",
    role: "Lead frontend developer. Built the shared utility libraries and UI component package across both portals, led theming, and created the PDF generation service.",
  },
  {
    name: "Iceland Travel Customer Portal",
    href: "https://my.icelandtravel.com/",
    description:
      "A customer portal for Iceland Travel bookings, giving travelers a single place to review trip details and access the documents they need before departure.",
    role: "Lead frontend developer. Sister portal to Nordic Visitor, sharing the same utility libraries, UI component package and PDF generation service.",
  },
];

export const links = [
  { label: "GitHub", href: "https://github.com/craig-o-curtis", icon: "github" as const },
  { label: "@burglekitt", href: "https://github.com/burglekitt", icon: "github" as const },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/craigocurtis/", icon: "linkedin" as const },
  { label: "StackOverflow", href: "https://stackoverflow.com/users/6090533/curtybear", icon: "stackoverflow" as const },
];

export const earlyWorks: ProjectCardProps[] = [
  {
    name: "Driverstest.info",
    href: "https://driverstest.info",
    description:
      "A gamified drivers test practice platform. I contributed to the product vision, UX/UI design, testing, content, and helped build features.",
    role: "Product, UX/UI, testing, content, development",
  },
  {
    name: "VR-English",
    href: "https://vr-english.com",
    description:
      "An English learning platform focused on content, testing, and product. I worked on the product direction, UX/UI, testing, and content strategy.",
    role: "Product, UX/UI, testing, content",
  },
  {
    name: "CodePen",
    href: "https://codepen.io/craigocurtis",
    description:
      "My earliest frontend experiments and UI explorations, where I tested ideas, interactions, and visual concepts.",
    role: "Design and development experiments",
  },
];
