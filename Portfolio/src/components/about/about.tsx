"use client";

import {
  Accessibility,
  ArrowUpRight,
  Gauge,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  allSkillCount,
  profile,
  projectCount,
  skillCategories,
} from "@/data/profile";
import { SectionHeading, EditableNote } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { CountUp } from "@/components/ui/count-up";

const ICONS: Record<string, LucideIcon> = {
  layers: Layers,
  sparkles: Sparkles,
  gauge: Gauge,
  accessibility: Accessibility,
};

const stats = [
  { value: allSkillCount, label: "Technologies in the toolbox", note: "Counted from the skills data" },
  { value: skillCategories.length, label: "Skill domains", note: "Languages to DevOps" },
  { value: projectCount, label: "Projects in the showcase", note: "Sample case studies" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section relative">
      <div
        className="aurora aurora-violet left-[-16%] top-[10%] h-[440px] w-[440px]"
        aria-hidden="true"
      />
      <div className="container-shell relative">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <span id="about-heading">
              Engineering with an{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-gradient-soft">
                editor&apos;s eye.
              </span>
            </span>
          }
          description="How I work, what I care about, and the kind of problems I like to take on."
        />

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          {/* Portrait / identity card */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <TiltCard intensity={5} className="card-surface rounded-[1.75rem] p-3">
              <div className="avatar-mesh relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-line/70">
                {profile.portrait ? (
                  <Image
                    src={profile.portrait}
                    alt={`Portrait of ${profile.name}`}
                    fill
                    sizes="(max-width: 1024px) 80vw, 34vw"
                    className="object-cover"
                    priority={false}
                  />
                ) : (
                  <>
                    <div className="noise-lines absolute inset-0 opacity-50" aria-hidden="true" />
                    <div
                      className="absolute inset-6 rounded-full border border-dashed border-line"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-[18%] rounded-full border border-line/70"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-[18%] animate-spin-slower rounded-full border border-cyan-glow/20 [border-style:dashed]"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="flex h-28 w-28 items-center justify-center rounded-full border border-line bg-raised-strong font-mono text-3xl tracking-[0.12em] text-frost backdrop-blur-sm">
                        {profile.avatarInitials}
                      </span>
                    </div>
                    <div
                      className="absolute left-1/2 top-[18%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-glow shadow-[0_0_18px_4px_var(--theme-glow-cyan)]"
                      aria-hidden="true"
                    />

                    <div className="absolute left-4 top-4 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-mist">
                      PORTRAIT / PLACEHOLDER
                    </div>
                    <div className="absolute right-4 top-4 flex gap-1" aria-hidden="true">
                      <span className="h-1 w-1 rounded-full bg-mist/40" />
                      <span className="h-1 w-1 rounded-full bg-mist/30" />
                      <span className="h-1 w-1 rounded-full bg-cyan-glow/70" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-5 pt-16">
                      <p className="font-serif text-2xl italic text-frost">{profile.name}</p>
                      <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-mist">
                        {profile.role}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 px-3 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mist">
                    {profile.availability}
                  </span>
                </div>
                {!profile.portrait ? <EditableNote>Add your photo</EditableNote> : null}
              </div>
            </TiltCard>
          </Reveal>

          {/* Bio + interests */}
          <div>
            <Reveal>
              <p className="font-serif text-[clamp(1.45rem,2.5vw,1.95rem)] italic leading-[1.4] text-frost">
                “Good interfaces feel quiet. The engineering behind them rarely is.”
              </p>
            </Reveal>

            <div className="mt-8 space-y-5">
              {profile.bio.map((paragraph, index) => (
                <Reveal key={index} delay={0.05 + index * 0.06}>
                  <p className="text-[0.95rem] leading-[1.85] text-mist">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-8">
              <div className="flex items-start gap-3 rounded-2xl border border-line/60 bg-raised p-4">
                <span
                  className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-glow/25 bg-cyan-glow/10 font-mono text-[0.55rem] text-cyan-glow"
                  aria-hidden="true"
                >
                  01
                </span>
                <p className="text-sm leading-relaxed text-mist">
                  <span className="font-medium text-frost">Currently:</span> building considered product
                  interfaces and exploring real-time 3D on the web — with a bias for performance and
                  accessibility.
                </p>
              </div>
            </Reveal>

            <div className="mt-10">
              <Reveal>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-mist">
                    What I bring
                  </h3>
                  <ArrowUpRight className="h-3.5 w-3.5 text-mist" aria-hidden="true" />
                </div>
              </Reveal>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {profile.interests.map((interest, index) => {
                  const Icon = ICONS[interest.icon] ?? Sparkles;
                  return (
                    <Reveal key={interest.title} delay={0.04 + index * 0.05}>
                      <TiltCard intensity={4} className="card-surface h-full rounded-2xl">
                        <div className="relative z-[3] flex h-full flex-col gap-3 p-5">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line/70 bg-raised text-cyan-glow">
                            <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                          </span>
                          <div>
                            <h4 className="text-sm font-medium text-frost">{interest.title}</h4>
                            <p className="mt-1.5 text-[0.78rem] leading-relaxed text-mist">
                              {interest.description}
                            </p>
                          </div>
                        </div>
                      </TiltCard>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Computed stats */}
        <Reveal className="mt-16 lg:mt-20">
          <div className="overflow-hidden rounded-3xl border border-line/60 bg-raised-strong">
            <dl className="grid grid-cols-1 gap-px sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: 0.55 }}
                  className="flex flex-col bg-carbon/95 px-6 py-8 text-center sm:px-8"
                >
                  <dt className="order-2 mt-3 text-[0.8rem] text-frost">
                    {stat.label}
                    <span className="mt-1 block font-mono text-[0.52rem] uppercase tracking-[0.16em] text-mist">
                      {stat.note}
                    </span>
                  </dt>
                  <dd className="order-1 text-[clamp(2.4rem,4.5vw,3.4rem)] font-medium leading-none tracking-[-0.04em] text-frost tabular-nums">
                    <CountUp to={stat.value} pad />
                  </dd>
                </motion.div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/60 bg-carbon/95 px-6 py-3">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-mist">
                Live counts, not invented numbers
              </p>
              <EditableNote>Replace sample data in profile.ts</EditableNote>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
