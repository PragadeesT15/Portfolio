"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function CountUp({
  to,
  duration = 1.5,
  suffix = "",
  pad = false,
  className,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  pad?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      setValue(to);
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, to, duration, reduced]);

  const display = pad ? String(value).padStart(2, "0") : String(value);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
    </span>
  );
}
