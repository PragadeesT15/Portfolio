"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useIntro } from "@/components/providers";
import { useTheme } from "@/components/theme-provider";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  tone: number;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { theme } = useTheme();
  const { introDone } = useIntro();
  const [enabled, setEnabled] = useState(true);
  const [userToggled, setUserToggled] = useState(false);

  useEffect(() => {
    if (reduced && !userToggled) setEnabled(false);
  }, [reduced, userToggled]);

  const resetRef = useRef<() => void>(() => undefined);

  const toggle = useCallback(() => {
    setUserToggled(true);
    setEnabled((value) => !value);
  }, []);

  useEffect(() => {
    if (!introDone) return;

    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const computed = window.getComputedStyle(wrap);
    const readVar = (name: string, fallback: string) =>
      computed.getPropertyValue(name).trim() || fallback;
    const palette = {
      a: readVar("--particle-a", "150, 232, 255"),
      b: readVar("--particle-b", "180, 150, 255"),
      line: readVar("--particle-line", "125, 195, 255"),
      glow: readVar("--particle-glow", "101, 214, 245"),
    };

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const makeParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.3 + 0.7,
      tone: Math.random(),
    });

    const initParticles = () => {
      const count = width < 480 ? 40 : width < 800 ? 64 : 92;
      particles = Array.from({ length: count }, makeParticle);
    };

    const draw = (animate: boolean) => {
      context.clearRect(0, 0, width, height);

      if (pointer.active) {
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 170);
        glow.addColorStop(0, `rgba(${palette.glow}, 0.13)`);
        glow.addColorStop(0.55, `rgba(${palette.b}, 0.05)`);
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = glow;
        context.fillRect(pointer.x - 170, pointer.y - 170, 340, 340);
      }

      const maxDistance = width < 600 ? 96 : 128;

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];

        if (animate) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < -20) particle.x = width + 20;
          if (particle.x > width + 20) particle.x = -20;
          if (particle.y < -20) particle.y = height + 20;
          if (particle.y > height + 20) particle.y = -20;

          if (pointer.active) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 170 && distance > 0.5) {
              const force = (1 - distance / 170) * 0.22;
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
            }
          }

          const speed = Math.hypot(particle.vx, particle.vy);
          if (speed > 1.6) {
            particle.vx = (particle.vx / speed) * 1.6;
            particle.vy = (particle.vy / speed) * 1.6;
          } else if (speed < 0.08) {
            particle.vx += (Math.random() - 0.5) * 0.04;
            particle.vy += (Math.random() - 0.5) * 0.04;
          }
        }

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.2;
            context.strokeStyle = `rgba(${palette.line}, ${alpha})`;
            context.lineWidth = 0.7;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 190) {
            const alpha = (1 - distance / 190) * 0.45;
            context.strokeStyle = `rgba(${palette.glow}, ${alpha})`;
            context.lineWidth = 0.8;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(pointer.x, pointer.y);
            context.stroke();
          }
        }

        context.beginPath();
        context.fillStyle =
          particle.tone > 0.82 ? `rgba(${palette.b}, 0.9)` : `rgba(${palette.a}, 0.85)`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const loop = () => {
      draw(true);
      raf = window.requestAnimationFrame(loop);
    };

    const update = () => {
      const shouldRun = enabled && visible && !document.hidden;
      if (shouldRun && raf === 0) {
        raf = window.requestAnimationFrame(loop);
      } else if (!shouldRun && raf !== 0) {
        window.cancelAnimationFrame(raf);
        raf = 0;
        draw(false);
      }
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
      draw(false);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
      if (!enabled) draw(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      pointer.x = px;
      pointer.y = py;
      pointer.active = true;

      particles.forEach((particle) => {
        const dx = particle.x - px;
        const dy = particle.y - py;
        const distance = Math.hypot(dx, dy);
        if (distance < 220 && distance > 0.5) {
          const force = (1 - distance / 220) * 3.4;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
      });

      if (!enabled) draw(false);
    };

    resetRef.current = () => {
      initParticles();
      if (!enabled) draw(false);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { rootMargin: "100px" },
    );

    const onVisibility = () => update();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(wrap);
    observer.observe(wrap);
    resize();

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    update();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
      resetRef.current = () => undefined;
    };
  }, [enabled, introDone, theme]);

  return (
    <div className="card-surface relative overflow-hidden rounded-3xl">
      <div
        ref={wrapRef}
        className="particle-stage relative h-[340px] touch-pan-y sm:h-[420px] lg:h-[460px]"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

        <div className="pointer-events-none absolute inset-0 mix-blend-overlay">
          <div className="noise-lines h-full w-full opacity-40" aria-hidden="true" />
        </div>

        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-mist">
          <span className="h-1 w-1 rounded-full bg-cyan-glow" aria-hidden="true" />
          Particle field / 01
        </div>
        <div className="pointer-events-none absolute right-4 top-4 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-mist">
          {enabled ? "Live" : "Paused"}
        </div>

        <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3">
          <p className="pointer-events-none hidden font-mono text-[0.5rem] uppercase tracking-[0.16em] text-mist sm:block">
            Move to bend · click to pulse
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={resetRef.current}
              className="flex h-9 items-center gap-1.5 rounded-full border border-line/70 bg-nav/70 px-3 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-mist backdrop-blur-md transition-colors hover:border-line hover:text-frost"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              Reset
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-pressed={enabled}
              className="flex h-9 items-center gap-1.5 rounded-full border border-line/70 bg-nav/70 px-3 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-mist backdrop-blur-md transition-colors hover:border-line hover:text-frost"
            >
              {enabled ? (
                <Pause className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Play className="h-3 w-3" aria-hidden="true" />
              )}
              {enabled ? "Pause" : "Play"}
            </button>
          </div>
        </div>
      </div>

      <p className="sr-only">
        An interactive particle field. Particles gather around the pointer and scatter when the field is
        tapped. Use the pause button to freeze the animation; the reset button restarts the field.
      </p>
    </div>
  );
}
