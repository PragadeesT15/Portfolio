"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/profile";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useIntro } from "@/components/providers";

const KEY = "orbital-portfolio:visited";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduced = usePrefersReducedMotion();
  const { completeIntro } = useIntro();

  useEffect(() => {
    try {
      const visited = window.sessionStorage.getItem(KEY);
      if (visited || reduced) {
        setVisible(false);
        completeIntro();
        return;
      }
      window.sessionStorage.setItem(KEY, "1");
    } catch {
      // Storage may be unavailable (private mode) — still show a short intro.
    }

    const timeout = setTimeout(() => {
      setVisible(false);
      completeIntro();
    }, 1250);

    return () => {
      clearTimeout(timeout);
    };
  }, [reduced, completeIntro]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 opacity-70">
            <div className="aurora aurora-cyan left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2" />
            <div className="aurora aurora-violet left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative flex w-[min(80vw,340px)] flex-col items-center gap-6">
            <motion.div
              className="glass flex h-16 w-16 items-center justify-center rounded-2xl font-mono text-lg tracking-[0.15em] text-frost"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {siteConfig.monogram}
            </motion.div>

            <div className="w-full space-y-3">
              <div className="flex items-center justify-between font-mono text-[0.58rem] uppercase tracking-[0.26em] text-mist">
                <span>{siteConfig.name}</span>
                <span>Loading</span>
              </div>
              <div className="h-px w-full overflow-hidden bg-line/60">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-glow via-electric to-violet-glow"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.05, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.32em] text-mist">
                Initialising experience
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
