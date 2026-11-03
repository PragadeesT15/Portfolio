"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, type CSSProperties } from "react";
import { profile } from "@/data/profile";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { useIntro } from "@/components/providers";
import { Magnetic } from "@/components/ui/magnetic";
import { SocialLinks } from "@/components/ui/social-links";
import { SceneFallback } from "@/components/hero/scene-fallback";

const HeroScene = dynamic(() => import("@/components/hero/hero-scene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.075, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const chips = [
  {
    label: "TypeScript",
    mark: "TS",
    accent: "var(--theme-cyan)",
    position: "left-0 top-[25%]",
    delay: "0s",
    visibility: "",
  },
  {
    label: "Next.js",
    mark: "N",
    accent: "var(--theme-text)",
    position: "right-0 top-[15%]",
    delay: "-2.4s",
    visibility: "",
  },
  {
    label: "Three.js",
    mark: "3D",
    accent: "var(--theme-violet)",
    position: "bottom-[24%] left-0",
    delay: "-4.8s",
    visibility: "hidden sm:flex",
  },
  {
    label: "React",
    mark: "RE",
    accent: "var(--theme-cyan)",
    position: "bottom-[12%] right-[2%]",
    delay: "-6.2s",
    visibility: "",
  },
  {
    label: "PostgreSQL",
    mark: "PG",
    accent: "var(--theme-success)",
    position: "left-[24%] top-0",
    delay: "-3.4s",
    visibility: "hidden md:flex",
  },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const { introDone } = useIntro();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [4.5, -4.5]), { stiffness: 110, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 110, damping: 20 });
  const driftX = useSpring(useTransform(px, [0, 1], [8, -8]), { stiffness: 90, damping: 22 });

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!finePointer || reduced || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const resetParallax = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const words = ["I Build", "Digital", "Experiences"];

  return (
    <section
      ref={sectionRef}
      id="home"
      data-intro
      aria-labelledby="hero-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={resetParallax}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 md:pt-32 lg:pb-20"
    >
      {/* Backdrop */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="perspective-floor" aria-hidden="true" />
      <div
        className="aurora aurora-cyan left-[-10%] top-[-12%] h-[460px] w-[460px] animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="aurora aurora-violet right-[-8%] top-[18%] h-[520px] w-[520px]"
        aria-hidden="true"
      />
      <div
        className="aurora aurora-electric bottom-[-24%] left-[26%] h-[420px] w-[620px]"
        aria-hidden="true"
      />

      <div className="container-shell relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-6">
          {/* Copy */}
          <motion.div variants={container} initial="hidden" animate={introDone ? "show" : "hidden"}>
            <motion.div variants={item} className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-frost">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                {profile.availability}
              </span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.26em] text-mist">
                Portfolio / 2026
              </span>
            </motion.div>

            <h1
              id="hero-heading"
              aria-label={profile.headline}
              className="mt-7 text-[clamp(2.65rem,7.8vw,6.35rem)] font-medium leading-[0.92] tracking-[-0.055em] text-frost"
            >
              <span aria-hidden="true">
                {words.map((word, index) => (
                  <span
                    key={word}
                    className={`block overflow-hidden pb-[0.06em] ${index === 1 ? "font-serif font-normal italic tracking-[-0.02em]" : ""}`}
                  >
                    <motion.span
                      className={`block ${index === 1 ? "text-gradient pr-[0.06em] text-[1.1em]" : ""}`}
                      initial={{ y: "118%", rotate: 2, opacity: 0 }}
                      animate={
                        introDone
                          ? { y: "0%", rotate: 0, opacity: 1 }
                          : { y: "118%", rotate: 2, opacity: 0 }
                      }
                      transition={{
                        duration: 0.95,
                        delay: 0.08 + index * 0.09,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {word}
                      {index === 2 ? <span className="text-cyan-glow">.</span> : null}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.p variants={item} className="mt-7 text-lg text-mist md:text-xl">
              Hi, I&apos;m{" "}
              <span className="font-medium text-frost">{profile.name}</span>, a{" "}
              <span className="font-medium text-frost">{profile.role}</span>.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 max-w-[34rem] text-[0.92rem] leading-relaxed text-mist md:text-[0.98rem]"
            >
              {profile.description}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.22}>
                <a href="#projects" className="btn btn-primary group">
                  Explore my work
                  <ArrowDownRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
              <Magnetic strength={0.18}>
                <a href="#contact" className="btn btn-ghost group">
                  Let&apos;s connect
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line/60 pt-6"
            >
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-mist">
                Elsewhere
              </span>
              <SocialLinks />
              <span className="hidden font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mist sm:inline">
                {profile.location}
              </span>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={introDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[580px]"
          >
            <motion.div
              style={{ rotateX, rotateY, x: driftX, transformStyle: "preserve-3d" }}
              className="relative aspect-square"
            >
              <div className="absolute inset-[4%] rounded-full border border-line/40" aria-hidden="true" />
              <div
                className="absolute inset-[13%] rounded-full border border-dashed border-line/60"
                aria-hidden="true"
              />
              <div
                className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle,var(--theme-glow-electric),transparent_65%)] blur-2xl"
                aria-hidden="true"
              />
              <div className="orbital-ring inset-[6%] animate-spin-slower" aria-hidden="true" />
              <div className="orbital-ring inset-[10%] animate-spin-slow [animation-direction:reverse]" aria-hidden="true" />

              <div className="absolute inset-[7%]">
                <HeroScene />
              </div>

              <div
                className="absolute left-1 top-1 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-mist"
                aria-hidden="true"
              >
                OBJ.001 / REALTIME
              </div>
              <div
                className="absolute right-1 top-1 flex items-center gap-1.5 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-mist"
                aria-hidden="true"
              >
                <span className="h-1 w-1 rounded-full bg-cyan-glow/80" />
                WEBGL
              </div>
              <div
                className="absolute bottom-1 left-1 hidden font-mono text-[0.5rem] uppercase tracking-[0.2em] text-mist sm:block"
                aria-hidden="true"
              >
                R3F + THREE.JS
              </div>
              <div
                className="absolute bottom-1 right-1 hidden font-mono text-[0.5rem] uppercase tracking-[0.2em] text-mist sm:block"
                aria-hidden="true"
              >
                MOVE TO ORBIT
              </div>

              {chips.map((chip) => (
                <div
                  key={chip.label}
                  className={`orbit-chip glass items-center gap-2 rounded-xl px-2.5 py-2 shadow-[0_18px_40px_-24px_var(--theme-shadow)] ${chip.position} ${chip.visibility}`}
                  style={{ "--delay": chip.delay } as CSSProperties}
                  aria-hidden="true"
                >
                  <span
                    className="grid h-6 w-6 place-items-center rounded-md border font-mono text-[0.46rem]"
                    style={{
                      color: chip.accent,
                      borderColor: `color-mix(in srgb, ${chip.accent} 26%, transparent)`,
                      background: `color-mix(in srgb, ${chip.accent} 10%, transparent)`,
                    }}
                  >
                    {chip.mark}
                  </span>
                  <span className="text-[0.68rem] font-medium text-frost">{chip.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="scroll-cue absolute bottom-4 left-1/2 hidden -translate-x-1/2 lg:inline-flex"
        >
          <span className="scroll-cue-track" aria-hidden="true" />
          Scroll to explore
        </motion.a>
      </div>
    </section>
  );
}
