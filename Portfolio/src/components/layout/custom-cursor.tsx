"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const INTERACTIVE = "a, button, [role='button'], [data-cursor='hover'], input, textarea, select, label";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    if (!dot || !ring) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    const trailPos = { ...target };
    let hasMoved = false;
    let frame = 0;
    let pressed = false;

    const reveal = () => {
      if (!dot) return;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      if (trail) trail.style.opacity = reduced ? "0" : "1";
    };

    const onPointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!hasMoved) {
        hasMoved = true;
        ringPos.x = target.x;
        ringPos.y = target.y;
        trailPos.x = target.x;
        trailPos.y = target.y;
        reveal();
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      const element = event.target as Element | null;
      if (!element?.closest) return;

      const isInteractive = Boolean(element.closest(INTERACTIVE));
      ring.dataset.hover = String(isInteractive);

      const labelHost = element.closest("[data-cursor-label]");
      const label = labelHost?.getAttribute("data-cursor-label");
      if (label) {
        ring.dataset.label = label;
      } else {
        delete ring.dataset.label;
      }
    };

    const onPointerDown = () => {
      pressed = true;
      ring.dataset.pressed = "true";
    };

    const onPointerUp = () => {
      if (!pressed) return;
      pressed = false;
      ring.dataset.pressed = "false";
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      if (trail) trail.style.opacity = "0";
    };

    const onEnter = () => {
      if (hasMoved) reveal();
    };

    const tick = () => {
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      trailPos.x += (target.x - trailPos.x) * 0.08;
      trailPos.y += (target.y - trailPos.y) * 0.08;

      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      if (trail) {
        trail.style.transform = `translate3d(${trailPos.x}px, ${trailPos.y}px, 0)`;
      }

      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("blur", onPointerUp);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    frame = window.requestAnimationFrame(tick);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("blur", onPointerUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, [reduced]);

  return (
    <div aria-hidden="true">
      <div ref={trailRef} className="cursor-trail" />
      <div ref={ringRef} className="cursor-ring" data-hover="false" data-pressed="false">
        <span className="cursor-label">View</span>
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
