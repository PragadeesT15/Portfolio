import Image from "next/image";
import type { Project } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * Generated concept artwork — intentionally abstract so the template never
 * ships fake screenshots. Replace with a real screenshot in /public if you have one.
 */
export function ProjectArtwork({
  project,
  className,
  large = false,
}: {
  project: Project;
  className?: string;
  large?: boolean;
}) {
  if (project.image) {
    return (
      <div
        className={cn(
          "relative h-full w-full overflow-hidden bg-[var(--theme-art-bg)]",
          className,
        )}
      >
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          sizes={large ? "(max-width: 1024px) 100vw, 58vw" : "64vw"}
          className="object-cover"
        />
      </div>
    );
  }

  const { from, to, mark, code } = project.art;
  const gradientId = `art-${project.id}`;
  const glowId = `glow-${project.id}`;

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[var(--theme-art-bg)]",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 130% at 12% -10%, color-mix(in srgb, ${from} 24%, transparent), transparent 55%), radial-gradient(100% 100% at 92% 110%, color-mix(in srgb, ${to} 30%, transparent), transparent 62%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--theme-art-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--theme-art-grid) 1px, transparent 1px)",
          backgroundSize: large ? "42px 42px" : "30px 30px",
          maskImage: "radial-gradient(ellipse at 50% 45%, #000 20%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, #000 20%, transparent 78%)",
        }}
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 600 400"
        className="absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={from} stopOpacity="0.5" />
            <stop offset="100%" stopColor={from} stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="480" cy="80" r="170" fill={`url(#${glowId})`} />
        <circle cx="480" cy="80" r="150" stroke={`url(#${gradientId})`} strokeOpacity="0.4" />
        <circle
          cx="480"
          cy="80"
          r="108"
          stroke="var(--theme-art-line)"
          strokeOpacity="0.9"
          strokeDasharray="3 8"
        />
        <circle cx="480" cy="80" r="62" stroke={`url(#${gradientId})`} strokeOpacity="0.28" />

        <path
          d="M-20 332 C 90 300, 150 352, 248 318 S 400 268, 500 300 S 560 310, 620 288"
          stroke={`url(#${gradientId})`}
          strokeOpacity="0.55"
        />
        <path
          d="M-20 352 C 90 326, 156 372, 260 340 S 410 296, 510 322 S 570 330, 630 312"
          stroke="var(--theme-art-line)"
          strokeOpacity="0.9"
        />

        {[
          [248, 318],
          [400, 283],
          [500, 300],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="7" fill="var(--theme-art-bg)" stroke={from} strokeOpacity="0.55" />
            <circle cx={cx} cy={cy} r="2.5" fill={from} />
          </g>
        ))}
      </svg>

      {/* Stylised application window — abstract UI, not a screenshot */}
      <div
        className={cn(
          "absolute overflow-hidden rounded-xl border border-[color:var(--theme-art-stroke)] bg-[var(--theme-art-window)] shadow-[0_30px_60px_-30px_var(--theme-shadow)] backdrop-blur-md",
          large
            ? "left-[7%] top-[16%] w-[58%] max-w-[360px]"
            : "left-[8%] top-[15%] w-[64%] max-w-[230px]",
        )}
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5 border-b border-[color:var(--theme-art-line)] px-2.5 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--theme-art-bar)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--theme-art-line)]" />
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `${from}cc` }} />
          <span className="ml-auto font-mono text-[0.4rem] uppercase tracking-[0.16em] text-[color:var(--theme-art-text)]">
            {code}
          </span>
        </div>
        <div className={cn("p-3", large && "p-4")}>
          <div className="flex items-center justify-between">
            <span className="block h-1.5 w-1/2 rounded-full bg-[color:var(--theme-art-bar)]" />
            <span className="block h-3 w-3 rounded-full border border-[color:var(--theme-art-line)]" />
          </div>
          <div className="mt-2 block h-1 w-2/3 rounded-full bg-[color:var(--theme-art-line)]" />

          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="rounded-md border border-[color:var(--theme-art-line)] bg-[var(--theme-art-badge)] p-1.5"
              >
                <span className="block h-1 w-3/4 rounded-full bg-[color:var(--theme-art-bar)]" />
                <span
                  className="mt-1.5 block h-2.5 w-1/2 rounded-sm"
                  style={{ backgroundColor: `${index === 1 ? to : from}55` }}
                />
              </div>
            ))}
          </div>

          <svg viewBox="0 0 120 34" className="mt-3 h-8 w-full" fill="none">
            <path
              d="M0 28 C 14 26, 20 17, 32 19 S 52 27, 64 16 S 84 6, 98 12 S 112 8, 120 4"
              stroke={`url(#${gradientId})`}
              strokeWidth="1.6"
            />
            <path
              d="M0 28 C 14 26, 20 17, 32 19 S 52 27, 64 16 S 84 6, 98 12 S 112 8, 120 4 L120 34 L0 34 Z"
              fill={`url(#${gradientId})`}
              opacity="0.08"
            />
          </svg>
        </div>
      </div>

      <span
        className={cn(
          "pointer-events-none absolute bottom-[4%] right-[5%] select-none font-mono font-medium leading-none tracking-[-0.06em]",
          large ? "text-[7rem] sm:text-[9rem]" : "text-[4.5rem]",
        )}
        style={{
          color: "transparent",
          WebkitTextStroke: `1px ${from}55`,
        }}
        aria-hidden="true"
      >
        {mark}
      </span>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[color:var(--theme-art-fade)] to-transparent" aria-hidden="true" />

      <span className="absolute right-3 top-3 rounded-full border border-[color:var(--theme-art-stroke)] bg-[var(--theme-art-badge)] px-2 py-1 font-mono text-[0.44rem] uppercase tracking-[0.16em] text-[color:var(--theme-art-text)] backdrop-blur-sm">
        Concept preview
      </span>
    </div>
  );
}
