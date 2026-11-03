import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import type { ComponentType } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const ICONS: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

export function SocialLinks({
  variant = "icons",
  className,
}: {
  variant?: "icons" | "list";
  className?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-2.5", variant === "list" && "flex-col items-stretch gap-3", className)}>
      {profile.socials.map((social) => {
        const Icon = ICONS[social.id] ?? Mail;
        const configured = Boolean(social.href);

        if (variant === "list") {
          const content = (
            <>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/70 bg-raised">
                <Icon className="h-4 w-4" strokeWidth={1.6} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-frost">{social.label}</span>
                <span className="block truncate font-mono text-[0.68rem] text-mist">{social.handle}</span>
              </span>
              {configured ? (
                <ArrowUpRight className="h-4 w-4 shrink-0 text-mist transition-colors group-hover:text-cyan-glow" />
              ) : (
                <span className="shrink-0 rounded-full border border-dashed border-line px-2 py-1 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-mist">
                  Add URL
                </span>
              )}
            </>
          );

          return (
            <li key={social.id}>
              {configured ? (
                <a
                  href={social.href ?? undefined}
                  target={social.href?.startsWith("http") ? "_blank" : undefined}
                  rel={social.href?.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="group flex items-center gap-3 rounded-2xl border border-line/60 bg-raised p-3 transition-colors hover:border-cyan-glow/30 hover:bg-raised-strong"
                >
                  {content}
                </a>
              ) : (
                <div
                  className="flex items-center gap-3 rounded-2xl border border-dashed border-line/70 p-3 opacity-70"
                  title={`Add your ${social.label} URL in src/data/profile.ts`}
                >
                  {content}
                </div>
              )}
            </li>
          );
        }

        if (!configured) {
          return (
            <li key={social.id}>
              <span
                className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full border border-dashed border-line bg-raised text-mist"
                title={`${social.label} link not configured — add it in src/data/profile.ts`}
              >
                <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.6} aria-hidden="true" />
                <span className="sr-only">{social.label} link not configured</span>
              </span>
            </li>
          );
        }

        return (
          <li key={social.id}>
            <a
              href={social.href ?? undefined}
              target={social.href?.startsWith("http") ? "_blank" : undefined}
              rel={social.href?.startsWith("http") ? "noreferrer noopener" : undefined}
              aria-label={`${social.label}${social.href?.startsWith("http") ? " (opens in a new tab)" : ""}`}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-line/70 bg-raised text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-glow/40 hover:bg-raised-strong hover:text-frost hover:shadow-[0_10px_30px_-16px_var(--theme-glow-cyan)]"
            >
              <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.6} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
