/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDIT THIS FILE TO MAKE THE PORTFOLIO YOURS
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every piece of personal content lives here. Items marked `sample: true`
 *  are demo content shipped with the template — replace them with your own
 *  work. Social URLs are `null` on purpose: nothing links to an invented
 *  profile. When you add a URL it becomes a real, clickable link.
 */

export const siteConfig = {
  name: "Pragadeeswaran T",
  monogram: "PT",
  role: "Full-Stack Developer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Pragadeeswaran T — Full-Stack Developer",
  description:
    "A futuristic, interactive developer portfolio built with Next.js, TypeScript, Three.js and Framer Motion. Replace this description with your own professional summary.",
  keywords: [
    "full-stack developer",
    "creative developer",
    "frontend engineer",
    "React",
    "Next.js",
    "Python",
    "Three.js",
    "portfolio",
  ],
  locale: "en_US",
} as const;

export const profile = {
  name: "Pragadeeswaran T",
  avatarInitials: "PT",
  role: "Full-Stack Developer",
  headline: "I Build Digital Experiences.",
  description:
    "I design and engineer fast, accessible products where considered interface design meets solid architecture — from the first sketch to the production deploy.",
  location: "Remote · Working worldwide",
  availability: "Open to select projects",
  email: "hello@example.com",
  emailNote: "Placeholder address — replace in profile.ts",
  bio: [
    "I'm a developer who lives in the space between engineering and design. I like interfaces that feel alive, systems that stay simple under pressure, and products that respect the people using them.",
    "My approach is deliberately end-to-end: research and interface design, typed front-end architecture, APIs and data models, then performance, accessibility and deployment. The result is work that looks sharp and holds up in production.",
  ],
  /** Replace with a real headshot in /public and update this path. */
  portrait: null as string | null,
  interests: [
    {
      title: "Design Systems",
      description: "Reusable primitives that keep products consistent as they grow.",
      icon: "layers",
    },
    {
      title: "Creative Engineering",
      description: "WebGL, motion and interaction work with a performance budget.",
      icon: "sparkles",
    },
    {
      title: "Performance",
      description: "Fast loads, small bundles and interfaces that never block input.",
      icon: "gauge",
    },
    {
      title: "Accessibility",
      description: "Keyboard-first, screen-reader aware, reduced-motion friendly.",
      icon: "accessibility",
    },
  ],
  socials: [
    {
      id: "github",
      label: "GitHub",
      handle: "@your-username",
      href: "https://github.com/PragadeesT15",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "in/your-name",
      href: "https://www.linkedin.com/in/pragadeest15/",
    },
    {
      id: "email",
      label: "Email",
      handle: "hello@example.com",
      href: "mailto:pragadeeswaranthangavel@gmail.com",
    },
  ],
};

export type SkillCategoryId =
  | "languages"
  | "frontend"
  | "backend"
  | "databases"
  | "testing"
  | "devops"
  | "tools";

export type Skill = {
  name: string;
  mark: string;
  note: string;
};

export type SkillCategory = {
  id: SkillCategoryId;
  label: string;
  tagline: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    tagline: "The syntax I reach for first.",
    skills: [
      { name: "TypeScript", mark: "TS", note: "Typed application, API and tooling code." },
      { name: "JavaScript", mark: "JS", note: "Modern ES modules in browser and Node runtimes." },
      { name: "Python", mark: "PY", note: "Scripting, data processing and backend services." },
      { name: "SQL", mark: "SQL", note: "Relational modelling, joins and query tuning." },
      { name: "Java", mark: "JV", note: "Developing robust, object-oriented applications with Java." },
      { name: "HTML & CSS", mark: "H", note: "Semantic markup and resilient layout systems." },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    tagline: "Interfaces, motion and 3D.",
    skills: [
      { name: "React", mark: "RE", note: "Component architecture with hooks and suspense." },
      { name: "Next.js", mark: "N", note: "App Router, server components and edge rendering." },
      { name: "Tailwind CSS", mark: "TW", note: "Token-driven styling with a small runtime." },
      { name: "Framer Motion", mark: "FM", note: "Layout, scroll and gesture animation." },
      { name: "Three.js", mark: "3D", note: "Real-time WebGL scenes and shader effects." },
      { name: "React Three Fiber", mark: "R3", note: "Declarative 3D scenes inside React." },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    tagline: "APIs, services and data flow.",
    skills: [
      { name: "Node.js", mark: "ND", note: "Event-driven services and API endpoints." },
      { name: "Express", mark: "EX", note: "Minimal HTTP services and middleware." },
      { name: "FastAPI", mark: "FA", note: "Typed Python APIs with automatic documentation." },
      { name: "REST APIs", mark: "API", note: "Resource modelling, validation and versioning." },
      { name: "Spring Boot", mark: "SB", note: "Building scalable REST APIs and backend applications with Java." },],
  },
  {
    id: "databases",
    label: "Databases",
    tagline: "Where the state lives.",
    skills: [
      { name: "PostgreSQL", mark: "PG", note: "Relational schema design and indexes." },
      { name: "MongoDB", mark: "MO", note: "Document models for flexible content." },
      { name: "MySQL", mark: "SQL", note: "Managing relational databases with efficient SQL queries, data modeling, and database optimization." },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    tagline: "Confidence before deploy.",
    skills: [
      { name: "Jest", mark: "JE", note: "Unit and integration coverage for React apps." },
      { name: "Playwright", mark: "PW", note: "Cross-browser end-to-end flows." },
      { name: "Selenium", mark: "SE", note: "Automating web applications with browser-based testing and end-to-end test automation." },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    tagline: "Ship, observe, iterate.",
    skills: [
      { name: "Docker", mark: "DK", note: "Reproducible local and production environments." },
      { name: "GitHub Actions", mark: "GA", note: "CI pipelines, checks and preview deploys." },
      { name: "Vercel", mark: "▲", note: "Edge deploys, caching and analytics." },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    tagline: "The daily workshop.",
    skills: [
      { name: "Git", mark: "GT", note: "Branching strategies and clean history." },
      { name: "VS Code", mark: "VS", note: "Editor setup, snippets and debugging." },
      { name: "Postman", mark: "PM", note: "API exploration and contract checks." },
      { name: "Linux", mark: "LX", note: "Shell workflows and server maintenance." },
    ],
  },
];

export type ProjectType = "Full-stack" | "Creative" | "Frontend" | "Backend";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  /** One or two sentences used in the featured layout. */
  blurb: string;
  /** The problem the project set out to solve. */
  problem: string;
  description: string;
  type: ProjectType;
  year: string;
  stack: string[];
  features: string[];
  repo: string | null;
  demo: string | null;
  featured: boolean;
  /** Template demo project. Set to false once you replace the content. */
  sample: boolean;
  image?: string;
  art: {
    from: string;
    to: string;
    mark: string;
    code: string;
  };
};

export const projects: Project[] = [
  {
    id: "nebula-commerce",
    name: "Order Management System",
    tagline: "Streamlined order processing with centralized branch and staff management.",
    blurb:
      "A centralized order management platform designed to simplify order processing, manage branch operations, and improve service workflows through an intuitive administrative interface.",
    problem:
      "Managing customer orders, branch operations, staff details, service rates, and delivery workflows across multiple branches can become complex, leading to manual errors, delayed processing, and inconsistent data.",
    description:
      "The Order Management System provides a centralized platform for managing customer bookings, tracking order progress, configuring branch and service details, and maintaining staff information. It helps administrators coordinate daily operations while providing better visibility into order status, service management, and branch-level activities.",
    type: "Full-stack",
    year: "2025",
    stack: ["Angular", "TypeScript", "Java", "Spring Boot", "MongoDB", "Docker"],
    features: [
      "Customer order booking and order status tracking",
      "Branch management with branch-specific service configurations",
      "Staff management with role-based access control",
      "Service and rate code management for order processing",
      "Pickup and delivery management with order tracking",
      "Order history, filtering, pagination, and administrative reporting",
    ],
    repo: null,
    demo: null,
    featured: true,
    sample: true,
    image: "/images/Modern Order Management Dashboard.png",
    art: { from: "#4de3ff", to: "#9b6bff", mark: "NC", code: "SYS / STOREFRONT" },
  },
  {
    id: "synapse",
    name: "Kitchen Management System",
    tagline: "Smart kitchen operations with real-time order and inventory management.",
    blurb:
      "A centralized kitchen management platform that streamlines food orders, tracks inventory, and simplifies daily kitchen operations.",
    problem:
      "Managing kitchen operations manually can lead to order delays, inventory mismatches, food wastage, and communication gaps between kitchen staff and management.",
    description:
      "The Kitchen Management System provides a centralized platform for managing incoming orders, monitoring food preparation, tracking ingredient stock, and organizing kitchen workflows. It helps kitchen staff process orders efficiently while giving administrators better visibility into inventory and daily operations.",
    type: "Full-stack",
    year: "2025",
    stack: ["React", "TypeScript", "Spring Boot", "Java", "MySQL", "Tailwind CSS"],
    features: [
      "Real-time order management with preparation status tracking",
      "Ingredient inventory management with low-stock alerts",
      "Kitchen dashboard for monitoring active and completed orders",
      "Menu management with food categories and pricing",
      "Role-based access for administrators and kitchen staff",
      "Daily order reports and kitchen performance tracking",
    ],
    repo: null,
    demo: null,
    featured: false,
    sample: true,
    image: "/images/KMS Inventory Dashboard Illustration.png",
    art: { from: "#5b8cff", to: "#4de3ff", mark: "SY", code: "LIVE / TELEMETRY", }

  },
  {
    id: "orbit-studio",
    name: "Orbit Studio",
    tagline: "3D configurator for a modular furniture line.",
    blurb:
      "An interactive product configurator where every material, module and angle renders in real time.",
    problem:
      "Static product photography cannot communicate how modular pieces combine, and heavy 3D viewers punish mobile visitors.",
    description:
      "Orbit Studio uses instanced geometry, compressed meshes and a progressive loader so the scene becomes interactive quickly without blocking the rest of the page.",
    type: "Creative",
    year: "2024",
    stack: ["Three.js", "React Three Fiber", "React", "TypeScript", "Vercel"],
    features: [
      "Real-time material and module switching",
      "Progressive model loading with a CSS fallback",
      "Touch controls plus keyboard camera presets",
      "Reduced-motion mode with static hero renders",
    ],
    repo: null,
    demo: null,
    featured: false,
    sample: true,
    art: { from: "#9b6bff", to: "#ff6ad5", mark: "OS", code: "WEBGL / CONFIG" },
  },
  {
    id: "pulse-notes",
    name: "Pulse Notes",
    tagline: "Offline-first notes for deep work.",
    blurb:
      "A quiet writing tool that syncs when it can and never gets in the way when it cannot.",
    problem:
      "Most note apps assume a connection and interrupt the writing flow with spinners, conflicts and upgrade prompts.",
    description:
      "Pulse keeps the document in local storage first, queues mutations and resolves conflicts with a small vector clock. The editor stays fully usable offline.",
    type: "Frontend",
    year: "2023",
    stack: ["React", "TypeScript", "IndexedDB", "Tailwind CSS", "Vitest"],
    features: [
      "Local-first editing with background sync",
      "Command palette and keyboard-only navigation",
      "Markdown export and version history",
      "Unit and integration coverage for merge logic",
    ],
    repo: null,
    demo: null,
    featured: false,
    sample: true,
    art: { from: "#4de3ff", to: "#6affc4", mark: "PN", code: "LOCAL / FIRST" },
  },
];

export type ExperienceEntry = {
  id: string;
  kind: "work" | "education";
  role: string;
  org: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
  sample: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    id: "role-one",
    kind: "work",
    role: "Full-Stack Developer",
    org: "Company Name",
    period: "2024 — Present",
    location: "Remote",
    summary:
      "Sample entry. Describe the product, your team and the part of the stack you own. Keep it specific and short.",
    highlights: [
      "Replace with a responsibility you actually owned",
      "Replace with a shipped feature and its outcome",
      "Replace with a measurable result, if you have one",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    sample: true,
  },
  {
    id: "role-two",
    kind: "work",
    role: "Frontend Developer",
    org: "Studio Name",
    period: "2022 — 2024",
    location: "Hybrid",
    summary:
      "Sample entry. Use this space for contracting, freelance work, an internship or a significant project you led.",
    highlights: [
      "Replace with the interface or system you built",
      "Replace with a collaboration or process improvement",
      "Replace with a measurable result, if you have one",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    sample: true,
  },
  {
    id: "education-one",
    kind: "education",
    role: "B.Sc. Computer Science",
    org: "Your University",
    period: "2018 — 2022",
    location: "Your City",
    summary:
      "Sample entry. Add your degree, bootcamp or self-directed programme. Replace the description with what you focused on.",
    highlights: ["Replace with a focus area or thesis topic"],
    stack: [],
    sample: true,
  },
];

/** Add real certifications here — none are invented for you. */
export const certifications: { name: string; issuer: string; year: string; href: string | null }[] = [];

export const navSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export const allSkillCount = skillCategories.reduce((total, category) => total + category.skills.length, 0);
export const projectCount = projects.length;
