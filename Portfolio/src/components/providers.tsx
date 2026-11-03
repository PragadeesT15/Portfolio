"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

type IntroState = {
  introDone: boolean;
  completeIntro: () => void;
};

const IntroContext = createContext<IntroState>({
  introDone: false,
  completeIntro: () => undefined,
});

export function useIntro() {
  return useContext(IntroContext);
}

const transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function Providers({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const completeIntro = useCallback(() => setIntroDone(true), []);

  // Safety net: never leave the hero hidden if the intro never reports back.
  useEffect(() => {
    const timeout = window.setTimeout(completeIntro, 2600);
    return () => window.clearTimeout(timeout);
  }, [completeIntro]);

  const value = useMemo(() => ({ introDone, completeIntro }), [introDone, completeIntro]);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user" transition={transition}>
        <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
      </MotionConfig>
    </ThemeProvider>
  );
}
