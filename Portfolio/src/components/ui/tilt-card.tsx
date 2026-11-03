"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Perspective tilt + spotlight that follows the pointer.
 * The spotlight variables are consumed by the `.spotlight` CSS class.
 */
export function TiltCard({
  children,
  className,
  intensity = 7,
  spotlight = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  spotlight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const active = finePointer && !reduced;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), {
    stiffness: 160,
    damping: 18,
  });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    px.set(x);
    py.set(y);
    ref.current.style.setProperty("--mx", `${x * 100}%`);
    ref.current.style.setProperty("--my", `${y * 100}%`);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1300 }}>
      <motion.div
        ref={ref}
        className={cn(spotlight && "spotlight", className)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={handleMove}
        onPointerLeave={reset}
      >
        {children}
      </motion.div>
    </div>
  );
}
