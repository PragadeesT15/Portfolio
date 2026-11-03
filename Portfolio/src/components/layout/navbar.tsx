"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navSections, profile, siteConfig } from "@/data/profile";
import { useActiveSection, useLockBodyScroll } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { SocialLinks } from "@/components/ui/social-links";
import { ThemeToggle } from "@/components/theme-toggle";

const SECTION_IDS = navSections.map((section) => section.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    if (!menu) return;

    const selector =
      'a[href], button:not([disabled]):not([tabindex="-1"]), input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const focusable = () =>
      Array.from(menu.querySelectorAll<HTMLElement>(selector)).filter(
        (element) => element.offsetParent !== null,
      );

    const first = focusable()[0];
    const timer = window.setTimeout(() => first?.focus(), 120);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[78] transition-all duration-500",
        open
          ? "border-b border-line/60 bg-nav"
          : scrolled
            ? "border-b border-line/60 bg-nav/85 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-shell relative z-[82] flex h-[76px] items-center justify-between gap-4">
        <Link
          href="#home"
          className="group flex items-center gap-3 rounded-xl"
        >
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-line/80 bg-raised font-mono text-[0.7rem] font-medium tracking-[0.08em] text-frost transition-colors duration-300 group-hover:border-cyan-glow/40">
            <span className="absolute inset-0 bg-gradient-to-br from-cyan-glow/20 via-transparent to-violet-glow/20 opacity-60" />
            <span className="relative">{siteConfig.monogram}</span>
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-[0.82rem] font-medium tracking-[-0.01em] text-frost">{profile.name}</span>
            <span className="mt-1.5 font-mono text-[0.52rem] uppercase tracking-[0.22em] text-mist">
              Portfolio / 2026
            </span>
          </span>
          <span className="sr-only">Back to top</span>
        </Link>

        <nav
          aria-label="Primary"
          className="glass absolute left-1/2 hidden -translate-x-1/2 items-center gap-0 rounded-full p-1.5 lg:flex"
        >
          {navSections.map((section) => {
            const isActive = active === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-2.5 py-2 text-[0.78rem] font-medium tracking-[0.01em] transition-colors duration-300",
                  isActive ? "text-frost" : "text-mist hover:text-frost",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full border border-line/70 bg-raised-strong"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-10">{section.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 lg:gap-2.5">
          <ThemeToggle />

          {/*
            Add the real PDF at public/resume.pdf. `download` forces the
            friendly filename instead of opening a new tab.
          */}
          <a
            href="/resume.pdf"
            download="Pragadeeswaran_T_Resume.pdf"
            type="application/pdf"
            aria-label="Download Resume"
            title="Download resume as PDF"
            className="group inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-full border border-line/80 bg-raised px-0 text-[0.78rem] font-medium text-frost transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-glow/45 hover:bg-raised-strong hover:shadow-[0_12px_30px_-18px_var(--theme-glow-cyan)] focus-visible:outline-cyan-glow md:w-auto md:px-3.5 lg:w-11 lg:px-0 xl:w-auto xl:px-3.5"
          >
            <Download
              className="h-3.5 w-3.5 shrink-0 text-cyan-glow transition-transform duration-300 group-hover:translate-y-0.5 group-hover:scale-110 group-focus-visible:translate-y-0.5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span className="hidden md:inline lg:hidden xl:inline">Download Resume</span>
          </a>

          <Link
            href="#contact"
            className="hidden h-11 items-center gap-2 rounded-full border border-line/80 bg-raised px-4 text-[0.78rem] font-medium text-frost transition-all duration-300 hover:border-cyan-glow/40 hover:bg-raised-strong sm:inline-flex"
          >
            Let&apos;s connect
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="relative z-[82] flex h-11 w-11 items-center justify-center rounded-full border border-line/80 bg-raised text-frost transition-colors hover:bg-raised-strong lg:hidden"
          >
            <AnimatePresence initial={false} mode="wait">
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            ref={menuRef}
            className="fixed inset-0 z-[77] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              className="absolute inset-0 h-full w-full cursor-default bg-nav/95 backdrop-blur-2xl"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              tabIndex={-1}
            />

            <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-[92px] sm:px-10">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_at_top,var(--theme-glow-violet),transparent_65%)]" />

              <nav aria-label="Mobile" className="relative flex flex-col">
                {navSections.map((section, index) => {
                  const isActive = active === section.id;
                  return (
                    <motion.a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={closeMenu}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ delay: 0.06 + index * 0.045, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "group flex items-center justify-between border-b border-line/60 py-4",
                        isActive ? "text-frost" : "text-mist",
                      )}
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          className={cn(
                            "font-mono text-[0.58rem] tracking-[0.2em]",
                            isActive ? "text-cyan-glow" : "text-mist",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[clamp(1.6rem,7vw,2.35rem)] font-medium leading-tight tracking-[-0.03em]">
                          {section.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "h-5 w-5 transition-all duration-300",
                          isActive ? "text-cyan-glow" : "text-mist group-hover:text-frost",
                        )}
                        aria-hidden="true"
                      />
                    </motion.a>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.45 }}
                className="relative mt-auto flex flex-col gap-5 pt-10"
              >
                <a
                  href="/resume.pdf"
                  download="Pragadeeswaran_T_Resume.pdf"
                  type="application/pdf"
                  aria-label="Download Resume"
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-line/70 bg-raised px-4 py-3.5 text-sm font-medium text-frost transition-all duration-300 hover:border-cyan-glow/40 hover:bg-raised-strong"
                >
                  <span className="flex items-center gap-2.5">
                    <Download
                      className="h-4 w-4 text-cyan-glow transition-transform duration-300 group-hover:translate-y-0.5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    Download Resume
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-mist transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-frost"
                    aria-hidden="true"
                  />
                </a>

                <div className="flex items-center justify-between gap-4">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm text-mist transition-colors hover:text-frost"
                  >
                    {profile.email}
                  </a>
                  <SocialLinks />
                </div>
                <p className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-mist">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                  {profile.availability}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
