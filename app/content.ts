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
    role: "Frontend architecture and implementation for student and educator reading workflows.",
  },
  {
    name: "NoteAffect",
    href: "https://www.noteaffect.com/",
    description:
      "An AI-powered classroom engagement platform for live lesson capture, interactive note-taking, Q&A, multilingual captions, recordings and engagement analytics.",
    role: "Frontend product work on the instructor and learner experience.",
  },
  {
    name: "Cisco Networking Academy",
    org: "Cisco",
    href: "https://www.netacad.com/",
    description:
      "Cisco's global learning platform for free and certification-aligned courses in networking, cybersecurity, programming, AI, data science and related career paths.",
    role: "Frontend implementation for learning, course and assessment experiences.",
  },
  {
    name: "Micetro",
    org: "Men&Mice",
    href: "https://bluecatnetworks.com/products/micetro/",
    description:
      "A browser-based DDI platform for managing DNS, DHCP and IPAM across on-prem, hybrid and cloud environments, including DNS zones, IP address space, reports, workflows and admin controls.",
    role: "Frontend engineering for complex enterprise network-management workflows.",
  },
  {
    name: "CTP",
    org: "Corivo",
    href: "https://travelconnect.corivo.io/",
    description:
      "Corivo Travel Platform, a travel-operations system used by tour operators to automate business processes, integrate external services and manage day-to-day travel workflows.",
    role: "Full-stack product engineering across travel operations and booking workflows.",
  },
  {
    name: "Iceland Tours",
    href: "https://www.icelandtours.is/",
    description:
      "A Reykjavik-based travel site for self-drive, guided, private, camping and multi-day Iceland vacation packages with flexible dates, local planning and online booking.",
    role: "Frontend engineering for package discovery, trip configuration and booking flows.",
  },
  {
    name: "森林猫 / SenlinMao",
    href: "https://www.senlinmao.com/",
    description:
      "A Chinese-market travel site offering Iceland and Europe packages, including self-drive, group, private and camping trips with Chinese-language planning content.",
    role: "Frontend localization and booking experience work for Chinese-speaking travelers.",
  },
  {
    name: "Nordic Visitor Customer Portal",
    href: "https://my.nordicvisitor.com/",
    description:
      "A customer portal for Nordic Visitor travelers to access post-booking materials such as vouchers, travel documents, itinerary details and support information.",
    role: "Frontend engineering for post-booking self-service and travel-document access.",
  },
  {
    name: "Iceland Travel Customer Portal",
    href: "https://my.icelandtravel.com/",
    description:
      "A customer portal for Iceland Travel bookings, giving travelers a single place to review trip details and access the documents they need before departure.",
    role: "Frontend engineering for traveler account, booking and document workflows.",
  },
];

export const links = [
  { label: "GitHub", href: "https://github.com/craig-o-curtis" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/craigocurtis/" },
  { label: "@burglekitt", href: "https://github.com/burglekitt" },
];
