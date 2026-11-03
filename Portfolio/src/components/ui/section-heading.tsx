import type { ReactNode } from "react";
import { PenLine } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <Reveal>
          <span className="eyebrow">
            <span className="text-cyan-glow">{index}</span>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 text-[clamp(2.35rem,5.4vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-frost">
            {title}
          </h2>
        </Reveal>
        {description ? (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-mist md:text-base">{description}</p>
          </Reveal>
        ) : null}
      </div>
      {action ? (
        <Reveal delay={0.16} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}

export function EditableNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed border-line/80 bg-raised px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-mist",
        className,
      )}
    >
      <PenLine className="h-2.5 w-2.5" aria-hidden="true" />
      {children}
    </span>
  );
}

const ACCENTS: Record<string, string> = {
  languages: "var(--theme-cyan)",
  frontend: "var(--theme-mark-blue)",
  backend: "var(--theme-violet)",
  databases: "var(--theme-mark-green)",
  testing: "var(--theme-mark-amber)",
  devops: "var(--theme-mark-pink)",
  tools: "var(--theme-mark-lilac)",
};

export function TechMark({
  mark,
  category,
  className,
}: {
  mark: string;
  category?: string;
  className?: string;
}) {
  const accent = ACCENTS[category ?? ""] ?? "var(--theme-cyan)";
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-mono text-[0.66rem] font-medium tracking-[0.02em]",
        className,
      )}
      style={{
        color: accent,
        borderColor: `color-mix(in srgb, ${accent} 28%, transparent)`,
        background: `linear-gradient(140deg, color-mix(in srgb, ${accent} 16%, transparent), color-mix(in srgb, ${accent} 3%, transparent) 70%)`,
        boxShadow: `inset 0 1px 0 color-mix(in srgb, ${accent} 18%, transparent)`,
      }}
    >
      {mark}
    </span>
  );
}
