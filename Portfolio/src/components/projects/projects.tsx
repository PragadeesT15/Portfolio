"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Sparkles } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { projects, type Project, type ProjectType } from "@/data/profile";
import { SectionHeading, EditableNote } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { ProjectArtwork } from "@/components/projects/project-artwork";
import { ProjectModal } from "@/components/projects/project-modal";
import { cn } from "@/lib/utils";

type Filter = ProjectType | "all";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "Full-stack", label: "Full-stack" },
  { id: "Creative", label: "Creative" },
  { id: "Frontend", label: "Frontend" },
  { id: "Backend", label: "Backend" },
];

function CardLinks({ project }: { project: Project }) {
  const links = [
    project.repo
      ? { href: project.repo, label: "Repository", icon: Github }
      : null,
    project.demo
      ? { href: project.demo, label: "Live demo", icon: ExternalLink }
      : null,
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github }[];

  if (links.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${project.name} — ${link.label} (opens in a new tab)`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line/70 bg-raised text-mist transition-colors hover:border-cyan-glow/35 hover:text-frost"
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
  featured = false,
}: {
  project: Project;
  onOpen: (project: Project) => void;
  featured?: boolean;
}) {
  return (
    <TiltCard
      intensity={featured ? 3.2 : 4.5}
      className={cn("group h-full", featured ? "rounded-[2rem]" : "rounded-3xl")}
    >
      <article
        className={cn(
          "card-surface grid h-full overflow-hidden",
          featured ? "rounded-[2rem] lg:grid-cols-[1.06fr_0.94fr]" : "rounded-3xl",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            featured ? "min-h-[240px] lg:min-h-[420px]" : "aspect-[16/10]",
          )}
        >
          <ProjectArtwork project={project} large={featured} />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-70"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="absolute inset-0 z-10 flex items-end justify-start p-4 text-left focus-visible:outline-cyan-glow"
            aria-label={`Open ${project.name} case study`}
          >
            <span className="translate-y-2 rounded-full border border-line bg-ink/55 px-3 py-1.5 font-mono text-[0.52rem] uppercase tracking-[0.16em] text-frost opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              Open case study
            </span>
          </button>
        </div>

        <div className={cn("relative z-[3] flex flex-col p-5 sm:p-6", featured && "lg:p-8")}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[0.52rem] uppercase tracking-[0.18em] text-mist">
              {project.type} <span className="text-mist">/</span> {project.year}
            </span>
            {project.sample ? (
              <span className="badge-sample rounded-full px-2 py-0.5 font-mono text-[0.46rem] uppercase tracking-[0.14em]">
                Sample
              </span>
            ) : null}
          </div>

          <h3
            className={cn(
              "mt-4 font-medium leading-[1.05] tracking-[-0.035em] text-frost",
              featured ? "text-[clamp(1.9rem,3.4vw,2.8rem)]" : "text-[1.25rem]",
            )}
          >
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="text-left transition-colors hover:text-cyan-glow/90 focus-visible:outline-cyan-glow"
            >
              {project.name}
            </button>
          </h3>

          <p
            className={cn(
              "mt-2.5 leading-relaxed text-mist",
              featured ? "max-w-md text-[0.9rem]" : "text-[0.78rem]",
            )}
          >
            {featured ? project.blurb : project.tagline}
          </p>

          {featured ? (
            <ul className="mt-5 space-y-2">
              {project.features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[0.76rem] leading-relaxed text-mist">
                  <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-cyan-glow/60" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          ) : null}

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Technologies used in ${project.name}`}>
            {project.stack.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line/60 bg-raised px-2 py-0.5 font-mono text-[0.54rem] text-mist"
              >
                {tech}
              </li>
            ))}
            {project.stack.length > 4 ? (
              <li className="rounded-full border border-line/50 px-2 py-0.5 font-mono text-[0.54rem] text-mist">
                +{project.stack.length - 4}
              </li>
            ) : null}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="group/cta inline-flex items-center gap-2 text-[0.74rem] font-medium text-frost transition-colors hover:text-cyan-glow focus-visible:outline-cyan-glow"
            >
              <span className="border-b border-line pb-1 transition-colors group-hover/cta:border-cyan-glow/40">
                View case study
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
            <CardLinks project={project} />
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.type === filter)),
    [filter],
  );

  const featuredProject = filter === "all" ? projects.find((project) => project.featured) : null;
  const gridProjects = visible.filter((project) => project.id !== featuredProject?.id);
  const activeFilterLabel = filters.find((item) => item.id === filter)?.label ?? "All work";

  const openProject = useCallback((project: Project) => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setSelected(project);
  }, []);

  const closeProject = useCallback(() => {
    setSelected(null);
    window.requestAnimationFrame(() => lastFocused.current?.focus());
  }, []);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section relative border-t border-line/40">
      <div
        className="aurora aurora-violet left-[-14%] top-[22%] h-[500px] w-[500px]"
        aria-hidden="true"
      />

      <div className="container-shell relative">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title={
            <span id="projects-heading">
              Work with a point of{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-gradient-soft">
                view.
              </span>
            </span>
          }
          description="Selected case studies — the problem, the build and the decisions behind it. Sample work is clearly labelled."
          action={<EditableNote>Replace with your projects</EditableNote>}
        />

        <Reveal className="mt-10">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by type">
            {filters.map((item) => {
              const isActive = item.id === filter;
              const count =
                item.id === "all"
                  ? projects.length
                  : projects.filter((project) => project.type === item.id).length;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  aria-pressed={isActive}
                  disabled={count === 0 && item.id !== "all"}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.72rem] font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40",
                    isActive
                      ? "border-transparent text-[color:var(--pill-text)]"
                      : "border-line/70 bg-raised text-mist hover:border-line hover:text-frost",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="filter-pill absolute inset-0 rounded-full"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                  <span
                    className={cn(
                      "relative z-10 font-mono text-[0.55rem] tabular-nums",
                      isActive ? "opacity-60" : "text-mist",
                    )}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-mist" aria-live="polite">
            {String(visible.length).padStart(2, "0")} case studies / {activeFilterLabel}
          </p>
          <p className="hidden font-mono text-[0.55rem] uppercase tracking-[0.16em] text-mist sm:block">
            Select a project to open it
          </p>
        </div>

        <motion.div layout className="mt-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {featuredProject && visible.some((project) => project.id === featuredProject.id) ? (
              <motion.div
                key={`featured-${featuredProject.id}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mb-4"
              >
                <ProjectCard project={featuredProject} onOpen={openProject} featured />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {gridProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -8 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <ProjectCard project={project} onOpen={openProject} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-line/60 bg-raised px-4 py-3">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-mist">
              Repository &amp; live URLs
            </span>
            <span className="text-[0.72rem] text-mist">
              Not included in the template — add them to each project in profile.ts and they appear here
              and in the case study.
            </span>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected ? <ProjectModal project={selected} onClose={closeProject} /> : null}
      </AnimatePresence>
    </section>
  );
}
