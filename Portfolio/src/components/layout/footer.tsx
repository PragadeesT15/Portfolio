import { ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { navSections, profile, siteConfig } from "@/data/profile";
import { EditableNote } from "@/components/ui/section-heading";
import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line/50 bg-carbon/60">
      <div
        className="aurora aurora-violet pointer-events-none -top-40 left-1/2 h-[380px] w-[720px] -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="container-shell relative py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="#home" className="group inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line/80 bg-raised font-mono text-[0.7rem] tracking-[0.08em] text-frost">
                {siteConfig.monogram}
              </span>
              <span className="text-sm font-medium text-frost">{profile.name}</span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-mist">
              {profile.role} focused on interfaces, systems and experiences that feel considered at every
              breakpoint.
            </p>
            <div className="mt-5 flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-mist">
              <span className="h-1.5 w-1.5 rounded-full bg-success/80" aria-hidden="true" />
              {profile.location}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-3 sm:gap-x-16">
            <div>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-mist">Explore</p>
              <ul className="mt-3 space-y-2">
                {navSections.slice(0, 3).map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm text-mist transition-colors hover:text-frost"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-mist">More</p>
              <ul className="mt-3 space-y-2">
                {navSections.slice(3).map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm text-mist transition-colors hover:text-frost"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1 text-sm text-mist transition-colors hover:text-frost"
                  >
                    Email
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-mist">Elsewhere</p>
            <SocialLinks />
            <a
              href="#home"
              className="group mt-2 inline-flex items-center gap-2 rounded-full border border-line/70 bg-raised px-3.5 py-2 text-[0.7rem] font-medium text-mist transition-colors hover:border-cyan-glow/35 hover:text-frost"
            >
              <ArrowUp
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              Back to top
            </a>
          </div>
        </div>

        <div className="hairline mt-12" />

        <div className="mt-6 flex flex-col gap-4 text-[0.7rem] text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. Built with Next.js, TypeScript, Three.js &amp; Framer Motion.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <EditableNote>Demo content · edit profile.ts</EditableNote>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em]">
              Designed &amp; developed with intent
            </span>
          </div>
        </div>
      </div>

      <div
        className="footer-wordmark pointer-events-none select-none overflow-hidden text-center font-medium leading-[0.72] tracking-[-0.06em]"
        data-wordmark={profile.name}
        aria-hidden="true"
      />
    </footer>
  );
}
