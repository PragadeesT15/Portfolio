"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { useRef } from "react";
import { certifications, experience, profile } from "@/data/profile";
import { SectionHeading, EditableNote } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 72%", "end 58%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section relative border-t border-line/40"
    >
      <div
        className="aurora aurora-cyan right-[-10%] top-[8%] h-[420px] w-[420px]"
        aria-hidden="true"
      />

      <div className="container-shell relative">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title={
            <span id="experience-heading">
              A timeline of{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-gradient-soft">
                craft.
              </span>
            </span>
          }
          description="Roles, programmes and the milestones in between. The sample entries below show the structure — replace them with your own history."
          action={<EditableNote>Sample timeline · edit profile.ts</EditableNote>}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="card-surface rounded-3xl p-6">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-mist">
                Timeline / 2018 — Now
              </span>
              <p className="mt-4 font-serif text-[1.65rem] italic leading-snug text-frost">
                A working history, kept honest.
              </p>
              <p className="mt-3 text-[0.8rem] leading-relaxed text-mist">
                No invented job titles, metrics or credentials. Each card is a placeholder you can
                replace in one file.
              </p>

              <ul className="mt-6 space-y-3 border-t border-line/60 pt-5">
                <li className="flex items-center gap-3 text-[0.72rem] text-mist">
                  <span className="h-2 w-2 rounded-full bg-cyan-glow" aria-hidden="true" />
                  Work experience
                </li>
                <li className="flex items-center gap-3 text-[0.72rem] text-mist">
                  <span className="h-2 w-2 rounded-full bg-violet-glow" aria-hidden="true" />
                  Education
                </li>
                <li className="flex items-center gap-3 text-[0.72rem] text-mist">
                  <span
                    className="h-2 w-2 rounded-full border border-dashed border-warn/60"
                    aria-hidden="true"
                  />
                  Sample content
                </li>
              </ul>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-line/60 bg-raised px-4 py-3">
                <span className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-mist">
                  Entries
                </span>
                <span className="font-mono text-sm text-frost">
                  {String(experience.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-line/60 bg-raised p-6">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-mist">
                Status
              </span>
              <p className="mt-3 flex items-center gap-2 text-sm text-frost">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                {profile.availability}
              </p>
              <a href="#contact" className="btn btn-ghost mt-4 w-full">
                Start a conversation
              </a>
            </div>
          </Reveal>

          <div ref={railRef} className="relative">
            <div
              className="absolute bottom-0 left-[7px] top-0 w-px bg-line/60"
              aria-hidden="true"
            />
            <motion.div
              className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-cyan-glow via-electric to-violet-glow"
              style={{ scaleY: progress }}
              aria-hidden="true"
            />

            <ol className="space-y-4">
              {experience.map((entry, index) => {
                const Icon = entry.kind === "education" ? GraduationCap : Briefcase;
                return (
                  <li key={entry.id} className="relative pl-9 sm:pl-12">
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className={cn(
                        "absolute left-0 top-7 flex h-[15px] w-[15px] items-center justify-center rounded-full border bg-ink",
                        entry.kind === "education" ? "border-violet-glow/45" : "border-cyan-glow/45",
                      )}
                      aria-hidden="true"
                    >
                      <span
                        className={cn(
                          "h-[5px] w-[5px] rounded-full",
                          entry.kind === "education" ? "bg-violet-glow" : "bg-cyan-glow",
                        )}
                      />
                    </motion.span>

                    <Reveal delay={index * 0.04}>
                      <article className="card-surface group rounded-2xl transition-colors duration-300 hover:border-line">
                        <div className="relative z-[3] p-5 sm:p-6">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line/70 bg-raised text-mist">
                                <Icon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                              </span>
                              <span className="font-mono text-[0.54rem] uppercase tracking-[0.16em] text-mist">
                                {entry.kind === "education" ? "Education" : "Work"} / {entry.period}
                              </span>
                            </div>
                            {entry.sample ? (
                              <span className="badge-sample rounded-full px-2 py-0.5 font-mono text-[0.46rem] uppercase tracking-[0.14em]">
                                Sample
                              </span>
                            ) : null}
                          </div>

                          <h3 className="mt-4 text-[1.18rem] font-medium leading-tight tracking-[-0.02em] text-frost">
                            {entry.role}
                          </h3>
                          <p className="mt-1 text-[0.8rem] text-mist">
                            {entry.org}
                            <span className="mx-2 text-mist" aria-hidden="true">
                              ·
                            </span>
                            <span className="font-mono text-[0.64rem] uppercase tracking-[0.1em] text-mist">
                              {entry.location}
                            </span>
                          </p>

                          <p className="mt-3.5 text-[0.82rem] leading-relaxed text-mist">
                            {entry.summary}
                          </p>

                          <ul className="mt-4 space-y-1.5">
                            {entry.highlights.map((highlight) => (
                              <li
                                key={highlight}
                                className="flex items-start gap-2.5 text-[0.78rem] leading-relaxed text-mist"
                              >
                                <span
                                  className="mt-[0.45rem] block h-px w-3 shrink-0 bg-cyan-glow/45"
                                  aria-hidden="true"
                                />
                                {highlight}
                              </li>
                            ))}
                          </ul>

                          {entry.stack.length > 0 ? (
                            <ul className="mt-4 flex flex-wrap gap-1.5">
                              {entry.stack.map((tech) => (
                                <li
                                  key={tech}
                                  className="rounded-full border border-line/60 bg-raised px-2 py-0.5 font-mono text-[0.53rem] text-mist"
                                >
                                  {tech}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ol>

            <Reveal className="relative mt-4 pl-9 sm:pl-12">
              <div className="rounded-2xl border border-dashed border-line/60 bg-raised p-5">
                <p className="font-mono text-[0.52rem] uppercase tracking-[0.18em] text-mist">
                  Next chapter
                </p>
                <p className="mt-2 text-[0.82rem] text-mist">
                  Your next role, programme or milestone goes here.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Certifications — never invented */}
        <div className="mt-14 grid gap-6 border-t border-line/50 pt-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <Reveal>
            <h3 className="text-[1.3rem] font-medium tracking-[-0.02em] text-frost">Certifications</h3>
            <p className="mt-2 max-w-xs text-[0.8rem] leading-relaxed text-mist">
              Only real credentials belong here. Add the name, issuer and year in profile.ts.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            {certifications.length > 0 ? (
              <ul className="space-y-2">
                {certifications.map((certification) => (
                  <li
                    key={`${certification.name}-${certification.issuer}`}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-line/60 bg-raised px-4 py-3"
                  >
                    <span className="flex items-center gap-3">
                      <Award className="h-4 w-4 text-cyan-glow/70" aria-hidden="true" />
                      <span>
                        <span className="block text-sm text-frost">{certification.name}</span>
                        <span className="block font-mono text-[0.55rem] uppercase tracking-[0.12em] text-mist">
                          {certification.issuer} · {certification.year}
                        </span>
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-line/60 bg-raised p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line/60 bg-raised text-mist">
                    <Award className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.82rem] text-frost">No certifications listed yet</p>
                    <p className="mt-1 text-[0.72rem] text-mist">
                      Empty by design — credentials are never fabricated for you.
                    </p>
                  </div>
                </div>
                <EditableNote>Add yours in profile.ts</EditableNote>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
