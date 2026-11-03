"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, ExternalLink, Github, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/profile";
import { useLockBodyScroll } from "@/lib/hooks";
import { EditableNote } from "@/components/ui/section-heading";
import { ProjectArtwork } from "@/components/projects/project-artwork";

function ProjectLink({
  href,
  label,
  kind,
}: {
  href: string | null;
  label: string;
  kind: "repo" | "demo";
}) {
  const Icon = kind === "repo" ? Github : ExternalLink;

  if (!href) {
    return (
      <div
        className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-line/80 bg-raised px-3.5 py-3 opacity-65"
        title={`Add the ${label.toLowerCase()} URL in src/data/profile.ts`}
      >
        <span className="flex items-center gap-2.5 text-[0.78rem] text-mist">
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
        </span>
        <span className="font-mono text-[0.48rem] uppercase tracking-[0.14em] text-mist">
          Not added
        </span>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-center justify-between gap-3 rounded-xl border border-line/70 bg-raised px-3.5 py-3 transition-colors hover:border-cyan-glow/35 hover:bg-raised-strong"
    >
      <span className="flex items-center gap-2.5 text-[0.78rem] text-frost">
        <Icon className="h-4 w-4 text-mist transition-colors group-hover:text-cyan-glow" aria-hidden="true" />
        {label}
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 text-mist" aria-hidden="true" />
    </a>
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(true);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const selector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(selector)).filter(
        (element) => element.offsetParent !== null,
      );

    const focusTimer = window.setTimeout(() => {
      panel.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }, 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="fixed inset-0 bg-ink/85 backdrop-blur-lg"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative flex min-h-full items-start justify-center p-3 sm:items-center sm:p-6">
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="glass-strong relative my-auto w-full max-w-4xl overflow-hidden rounded-[1.6rem] shadow-[0_50px_120px_-40px_var(--theme-shadow)] sm:rounded-[2rem]"
          initial={{ opacity: 0, y: 28, scale: 0.975 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.985 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            aria-label="Close project case study"
            className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink/60 text-frost backdrop-blur-md transition-colors hover:border-cyan-glow/40 hover:bg-ink/85 sm:right-4 sm:top-4"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="max-h-[90svh] overflow-y-auto overscroll-contain">
            <div className="relative h-44 overflow-hidden sm:h-60">
              <ProjectArtwork project={project} large />
              <div
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent"
                aria-hidden="true"
              />
            </div>

            <div className="relative px-5 pb-7 pt-5 sm:px-8 sm:pb-9">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip">{project.type}</span>
                <span className="chip">{project.year}</span>
                {project.featured ? <span className="chip">Featured</span> : null}
                {project.sample ? (
                  <span className="badge-sample rounded-full px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em]">
                    Sample project
                  </span>
                ) : null}
              </div>

              <h2
                id="project-modal-title"
                className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.04em] text-frost"
              >
                {project.name}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-mist sm:text-[0.95rem]">{project.tagline}</p>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
                <div>
                  <div>
                    <h3 className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-cyan-glow/80">
                      The problem
                    </h3>
                    <p className="mt-3 text-[0.9rem] leading-[1.8] text-mist">{project.problem}</p>
                  </div>

                  <div className="mt-7">
                    <h3 className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-cyan-glow/80">
                      The build
                    </h3>
                    <p className="mt-3 text-[0.9rem] leading-[1.8] text-mist">{project.description}</p>
                  </div>

                  <div className="mt-7">
                    <h3 className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-cyan-glow/80">
                      Key features
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-[0.85rem] leading-relaxed text-mist">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-cyan-glow/25 bg-cyan-glow/10">
                            <Check className="h-2.5 w-2.5 text-cyan-glow" aria-hidden="true" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <aside className="space-y-6">
                  <div>
                    <h3 className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-mist">
                      Stack
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-line/70 bg-raised px-2.5 py-1 font-mono text-[0.6rem] text-frost"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-mist">
                      Links
                    </h3>
                    <div className="mt-3 space-y-2">
                      <ProjectLink href={project.repo} label="Repository" kind="repo" />
                      <ProjectLink href={project.demo} label="Live demo" kind="demo" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-line/60 bg-raised p-3.5">
                    <p className="text-[0.72rem] leading-relaxed text-mist">
                      This case study is template content. Replace the copy, stack and links with
                      your own project in{" "}
                      <code className="rounded bg-raised-strong px-1 py-0.5 font-mono text-[0.65rem] text-frost">
                        src/data/profile.ts
                      </code>
                      .
                    </p>
                    <EditableNote className="mt-3">Concept preview, not a screenshot</EditableNote>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
