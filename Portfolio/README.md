# Orbital — a futuristic developer portfolio

An interactive, production-ready portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **React Three Fiber / Three.js**, and **Lucide**.

The visual direction is deep-space: near-black and midnight violet surfaces, cyan/electric-blue accents, glass panels, gradient hairlines, a perspective grid, and a real-time 3D sculpture. Motion is used to guide attention — not to decorate every pixel.

> **Template content notice:** no personal details, employers, projects, metrics or credentials were supplied with this brief, so everything personal is a clearly labelled placeholder. All of it lives in one file: [`src/data/profile.ts`](src/data/profile.ts). Nothing links to an invented GitHub or LinkedIn profile.

---

## Quick start

Requirements: **Node.js 20.9+** and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Production check:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

Optional environment variables (contact email delivery, canonical URL):

```bash
# Windows PowerShell
Copy-Item .env.example .env.local

# macOS / Linux
cp .env.example .env.local
```

The site runs fully without an env file. The contact form simply reports that delivery is not configured instead of pretending to send.

### Resume PDF

The navbar’s **Download Resume** button serves `/resume.pdf` and saves it as `Pragadeeswaran_T_Resume.pdf`. The file is intentionally not included in the repository — drop your real PDF at [`public/resume.pdf`](public) and the button works immediately on desktop and mobile. (Until then, the link 404s; it is never simulated.)

---

## What was implemented

### Experience & design

- Full-screen hero with a real interactive **WebGL sculpture** (distorted icosahedron, wireframe shell, orbital rings, particle dust), floating technology chips, HUD annotations, mouse parallax, and a CSS fallback if WebGL is unavailable.
- Staggered word-mask headline reveal, availability pill, magnetic CTAs, social links, and a scroll cue.
- Cinematic one-per-session preloader that coordinates with the hero entrance.
- Custom desktop cursor (dot + lagging ring + soft trail) that enlarges over interactive elements, shows a `VIEW` label on project art, reacts to click, and automatically disappears on touch devices. Native cursor is preserved on form fields.
- Scroll progress bar, glass navigation with an animated active-section pill, and a full-screen mobile menu with focus trapping, Escape handling and scroll lock.
- Scroll-triggered reveals, scroll-linked timeline progress, spotlight/tilt cards, count-up stats and animated filter transitions.
- About portrait placeholder, biography, interest cards, computed (never invented) statistics and a career timeline.
- Skills universe with seven categories, animated filtering, keyboard-accessible tooltips and no fake proficiency levels.
- Project showcase: featured case study + filterable grid, generated concept artwork, and an accessible modal with problem/build/features/stack/links, focus trap, Escape close and focus restoration.
- Experience timeline with a progress rail, work/education markers, explicit “Sample” badges, and an honest empty state for certifications.
- Playground with a real Canvas 2D **particle constellation** (pointer repulsion, click pulse, reset, pause, off-screen pausing, reduced-motion-friendly still frame) plus a syntax-highlighted, replayable, copyable code animation.
- Contact section with a validated form, inline errors, `aria-live` feedback, honeypot spam protection and a server-side rate limit.
- Custom 404, favicon, Open Graph image, manifest, sitemap, robots and full metadata.

### Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), skip link, and one `h1`.
- Visible `:focus-visible` styles and keyboard support across the nav, filters, dialogs and playground.
- Focus trap + Escape + focus restoration for the mobile menu and project modal.
- Form labels, `aria-invalid`, `aria-describedby`, live feedback and server-side validation.
- `prefers-reduced-motion` honoured at the Framer Motion, CSS, WebGL and canvas levels. The playground exposes a manual Play/Pause control regardless.
- Colour contrast aimed at WCAG AA on the dark surfaces; text never relies on colour alone.
- Touch targets ≥ 40px on primary controls; no horizontal overflow.

### Performance

- Three.js/R3F is lazy-loaded with `next/dynamic` and rendered only on a supported, in-view canvas; DPR is capped.
- The particle canvas pauses off-screen and when the tab is hidden, caps DPR at 2, and draws a static frame when motion is disabled.
- All imagery is CSS/SVG-generated (no large raster payloads); the optional portrait uses `next/image`.
- No animation library is used for the playground; no post-processing, environment maps or external 3D assets.
- `optimizePackageImports` enabled for icons and Framer Motion.
- Only three self-hosted-by-Next Google fonts, with `display: swap`.

---

## Make it yours

### 1. Personal content — `src/data/profile.ts`

This file drives almost the entire site:

| What | Where |
| --- | --- |
| Name, monogram, role, headline, bio, email | `siteConfig`, `profile` |
| GitHub / LinkedIn URLs (currently `null`) | `profile.socials` |
| Portrait (`null` shows the abstract avatar) | `profile.portrait` → add `/public/portrait.jpg` |
| Skills + categories | `skillCategories` |
| Projects, artwork colours, links, featured flag | `projects` |
| Work / education timeline | `experience` |
| Certifications (empty by design) | `certifications` |
| Availability, location, interests | `profile` |

The About statistics are computed from the skills/projects arrays, so they stay accurate when you edit the data.

Project cards use generated abstract artwork labelled **Concept preview** — deliberately not fake screenshots. To use a real screenshot:

1. Add the image to `/public/projects/`.
2. Extend `Project` with an `image` field.
3. Replace `<ProjectArtwork />` in `src/components/projects/projects.tsx` and `src/components/projects/project-modal.tsx` with `next/image`.

Social links with `href: null` render as non-interactive “Add URL” placeholders — they are never broken links.

### 2. Contact delivery

The API route at `src/app/api/contact/route.ts` validates every message on the server, applies a simple in-memory rate limit, and uses [Resend](https://resend.com) only when credentials exist.

```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@your-domain.com
CONTACT_FROM_EMAIL="Portfolio <hello@your-domain.com>"
```

- `CONTACT_FROM_EMAIL` must be on a domain verified in Resend.
- Keys are read only on the server. Nothing sensitive is exposed to the client.
- Without credentials the route returns `{ ok: true, delivered: false }`; the UI says clearly that no email was sent and offers the direct `mailto:` link.

For a different provider (Postmark, SendGrid, Nodemailer, a form service), replace the `fetch` block. Keep the route contract: `{ ok, delivered, message, errors? }`.

### 3. Metadata & SEO

Update `siteConfig` in `profile.ts` (name, title, description, keywords, URL) and set `NEXT_PUBLIC_SITE_URL` in production. The OG image at `src/app/opengraph-image.tsx` picks up the same values automatically. Replace `src/app/icon.svg` for a custom favicon.

### 4. Deployment

**Vercel (recommended)**

1. Push the repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) and the optional contact variables.
4. Deploy.

Any Node host works:

```bash
npm run build
npm start          # serves the production build on :3000
```

---

## Project structure

```
src/
├─ app/
│  ├─ api/contact/route.ts     # validated, rate-limited contact endpoint
│  ├─ globals.css              # design tokens, glass/glow/cursor/grid system
│  ├─ layout.tsx               # fonts, metadata, site chrome
│  ├─ page.tsx                 # section composition
│  ├─ not-found.tsx            # custom 404
│  ├─ opengraph-image.tsx      # dynamic OG card
│  ├─ icon.svg                 # favicon
│  ├─ manifest.ts, robots.ts, sitemap.ts
├─ components/
│  ├─ layout/                  # navbar, footer, preloader, cursor, progress
│  ├─ hero/                    # hero copy, R3F scene, CSS fallback
│  ├─ about/ skills/ projects/ experience/ playground/ contact/
│  └─ ui/                      # reveal, magnetic, tilt, counters, socials…
├─ data/profile.ts             # ← all editable content
└─ lib/                        # hooks + utilities
```

## Design tokens

Core colours and fonts live in the `@theme` block at the top of `src/app/globals.css`:

- Backgrounds: `#05060a`, `#080a11`, `#0c0f19`
- Accents: cyan `#4de3ff`, violet `#9b6bff`, electric blue `#5b8cff`
- Type: Space Grotesk (sans), Instrument Serif (italic accents), JetBrains Mono (labels/code)

## Notes

- Fonts are fetched at build time by `next/font`; an offline build needs a warm font cache or a self-hosted font swap.
- The contact rate limit is in-memory per server instance. For multi-instance production traffic, back it with Redis or a provider-level limit.
- The playground and 3D scene both degrade gracefully. No interaction is required to read the page.

Built to be edited. Replace the placeholders, keep the craft.
