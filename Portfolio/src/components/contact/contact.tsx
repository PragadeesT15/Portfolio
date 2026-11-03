"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/profile";
import { SectionHeading, EditableNote } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";
import { ContactForm } from "@/components/contact/contact-form";

export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2200);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 2500);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section relative border-t border-line/40">
      <div
        className="aurora aurora-violet bottom-[-10%] left-[-10%] h-[480px] w-[520px]"
        aria-hidden="true"
      />
      <div
        className="aurora aurora-cyan right-[-12%] top-[5%] h-[420px] w-[420px]"
        aria-hidden="true"
      />

      <div className="container-shell relative">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title={
            <span id="contact-heading">
              Have an{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-gradient">
                Interesting Project
              </span>{" "}
              in Mind?
            </span>
          }
          description="Tell me what you're building, what's in the way, and where you want to take it. Good work starts with a clear conversation."
          action={<EditableNote>Add your real details</EditableNote>}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
          <div className="flex flex-col gap-4">
            <Reveal>
              <div className="card-surface rounded-3xl p-5 sm:p-6">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-mist">
                  Direct line
                </span>

                <div className="mt-4 flex items-start gap-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="group inline-flex min-w-0 items-start gap-2 break-all text-[clamp(1.15rem,2.2vw,1.6rem)] font-medium tracking-[-0.02em] text-frost transition-colors hover:text-cyan-glow"
                  >
                    <Mail className="mt-1.5 h-4 w-4 shrink-0 text-cyan-glow/70" aria-hidden="true" />
                    <span className="underline decoration-[color:var(--theme-border)] decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-cyan-glow/40">
                      {profile.email}
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line/70 bg-raised text-mist transition-colors hover:border-cyan-glow/35 hover:text-frost"
                  >
                    {copyState === "copied" ? (
                      <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <p className="sr-only" aria-live="polite">
                  {copyState === "copied"
                    ? "Email address copied to clipboard"
                    : copyState === "error"
                      ? "Could not copy the email address"
                      : ""}
                </p>
                <p className="mt-2 text-[0.68rem] text-mist">
                  {profile.emailNote}
                </p>

                <div className="mt-6 border-t border-line/60 pt-5">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-mist">
                    Elsewhere
                  </p>
                  <SocialLinks variant="list" className="mt-3" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="flex items-center gap-3 rounded-2xl border border-success/25 bg-success/10 px-4 py-3.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.78rem] font-medium text-frost">{profile.availability}</p>
                  <p className="mt-0.5 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-mist">
                    {profile.location}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-line/60 bg-raised p-4">
                <p className="text-[0.72rem] leading-relaxed text-mist">
                  If the form isn&apos;t your thing, email works just as well. I read everything that
                  isn&apos;t a newsletter pitch.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
