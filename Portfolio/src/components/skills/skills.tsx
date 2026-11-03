"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { allSkillCount, skillCategories, type SkillCategoryId } from "@/data/profile";
import { SectionHeading, EditableNote, TechMark } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";

type Filter = SkillCategoryId | "all";

const filters: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "All", count: allSkillCount },
  ...skillCategories.map((category) => ({
    id: category.id as Filter,
    label: category.label,
    count: category.skills.length,
  })),
];

export function Skills() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    const source =
      filter === "all"
        ? skillCategories.flatMap((category) =>
            category.skills.map((skill) => ({
              ...skill,
              category: category.id,
              categoryLabel: category.label,
            })),
          )
        : (skillCategories
            .find((category) => category.id === filter)
            ?.skills.map((skill) => ({
              ...skill,
              category: filter,
              categoryLabel: skillCategories.find((item) => item.id === filter)?.label ?? "",
            })) ?? []);

    return source;
  }, [filter]);

  const activeLabel = filters.find((item) => item.id === filter)?.label ?? "All";

  return (
    <section id="skills" aria-labelledby="skills-heading" className="section relative border-t border-line/40">
      <div
        className="aurora aurora-cyan right-[-12%] top-[16%] h-[460px] w-[460px]"
        aria-hidden="true"
      />

      <div className="container-shell relative">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title={
            <span id="skills-heading">
              A universe of{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-gradient-soft">
                tools.
              </span>
            </span>
          }
          description="A working toolkit, grouped by the problems it solves. Hover or focus any card for the detail."
          action={<EditableNote>Sample stack · replace in profile.ts</EditableNote>}
        />

        <Reveal className="mt-10">
          <div className="flex flex-col gap-4">
            <div
              role="group"
              aria-label="Filter skills by category"
              className="flex flex-wrap gap-2"
            >
              {filters.map((item) => {
                const isActive = item.id === filter;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "relative inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.72rem] font-medium transition-colors duration-300 focus-visible:outline-cyan-glow",
                      isActive
                        ? "border-transparent text-[color:var(--pill-text)]"
                        : "border-line/70 bg-raised text-mist hover:border-line hover:text-frost",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="skill-filter-pill"
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
                      {String(item.count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-mist" aria-live="polite">
                Showing {String(visible.length).padStart(2, "0")} / {activeLabel}
              </p>
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-mist">
                No invented proficiency levels
              </p>
            </div>
          </div>
        </Reveal>

        <motion.ul
          layout
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:gap-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((skill) => {
              const tooltipId = `skill-${skill.category}-${skill.name.replace(/[^a-z0-9]/gi, "-")}`;
              return (
                <motion.li
                  key={`${skill.category}-${skill.name}`}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <TiltCard intensity={5} className="group relative z-0 h-full rounded-2xl hover:z-20 focus-within:z-20">
                    <div
                      tabIndex={0}
                      role="group"
                      aria-label={`${skill.name}, ${skill.categoryLabel}`}
                      aria-describedby={tooltipId}
                      data-cursor="hover"
                      className="relative h-full rounded-2xl border border-line/60 bg-panel p-4 transition-colors duration-300 group-hover:border-cyan-glow/25 group-hover:bg-panel-hover group-focus-within:border-cyan-glow/30 sm:p-5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <TechMark mark={skill.mark} category={skill.category} />
                        <span className="rounded-full border border-line/50 bg-raised px-2 py-0.5 font-mono text-[0.46rem] uppercase tracking-[0.14em] text-mist">
                          {skill.categoryLabel}
                        </span>
                      </div>

                      <h3 className="mt-4 text-[0.88rem] font-medium leading-tight text-frost">
                        {skill.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[0.68rem] leading-relaxed text-mist">
                        {skill.note}
                      </p>

                      <div
                        id={tooltipId}
                        role="tooltip"
                        className="pointer-events-none absolute inset-x-2 bottom-[calc(100%+8px)] z-30 translate-y-1 rounded-xl border border-line/80 bg-elevated p-3 text-left text-[0.72rem] leading-relaxed text-mist opacity-0 shadow-[0_24px_50px_-20px_var(--theme-shadow)] backdrop-blur-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                      >
                        <span className="mb-1 flex items-center gap-1.5 font-mono text-[0.48rem] uppercase tracking-[0.16em] text-cyan-glow/80">
                          <span className="h-1 w-1 rounded-full bg-cyan-glow" aria-hidden="true" />
                          {skill.categoryLabel}
                        </span>
                        <span className="block text-frost">{skill.name}</span>
                        <span className="mt-1 block text-mist">{skill.note}</span>
                      </div>
                    </div>
                  </TiltCard>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        <Reveal className="mt-8">
          <p className="max-w-xl text-[0.72rem] leading-relaxed text-mist">
            The list reflects a general toolkit, not a claim of mastery. Swap the entries for the
            technologies you actually use — the counts and filters update automatically.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
